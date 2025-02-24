import React, { useMemo } from "react";
import type { GetStaticProps, NextPage } from "next";
import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import ical from "node-ical";
import { Scheduler } from "@aldabil/react-scheduler";
import { ja } from "date-fns/locale";

import Title from "../../components/title";
import Link from "../../src/link";

import Logo from "../../assets/kosen-calendar.svg";

type Props = {
  resources: Resource[];
  events: { title: string; start: string; end: string; name: string }[];
};
type Resource = { name: string; path: string; color: string };

const paths = [
  "kitakyusyu/kitakyusyu.ics",
  "fukui/fukui.ics",
  "ishikawa/ishikawa_2021.ics",
  "nagaoka/nagaoka.ics",
  "tsuyama/tsuyama.ics",
];

const baseUrl = "https://api.github.com/repos/kamekyame/kosen-calendar";
const githubIoBaseUrl =
  "https://raw.githubusercontent.com/kamekyame/kosen-calendar/main";
const githubUrl = "https://github.com/kamekyame/kosen-calendar";

const isVCalendar = (obj: ical.CalendarComponent): obj is ical.VCalendar => {
  return obj.type === "VCALENDAR";
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const events: Props["events"] = [];
  const promises = paths.map((path, i) => {
    return new Promise<Resource>(async (resolve, reject) => {
      try {
        const res = await fetch(`${baseUrl}/contents/${path}`, {
          headers: new Headers({
            Authorization: `token ${process.env.GH_ACCESS_TOKEN}`,
          }),
        });
        // console.log(res);
        const data = await res.json();
        // console.log(data);
        const icsStr = Buffer.from(data.content, "base64").toString();
        const ics = await ical.async.parseICS(icsStr);
        const icsEvents = Object.values(ics);
        // console.log(icsEvents);
        const vcalendar = icsEvents.find(isVCalendar);
        const name = vcalendar && vcalendar["WR-CALNAME"]?.split(" ")[0];
        if (name === undefined) throw Error("name is undefined");

        const resource: Resource = {
          name,
          path,
          color: `hsl(${(i * 360) / paths.length} ,80%,60%)`,
        };
        icsEvents.forEach((event) => {
          if (event.type !== "VEVENT") return;
          const end =
            event.datetype === "date-time"
              ? event.end
              : new Date(event.end.getTime() - 1);
          events.push({
            title: event.summary,
            start: event.start.toISOString(),
            end: end.toISOString(),
            name,
          });
        });
        resolve(resource);
      } catch (e) {
        reject(e);
      }
    });
  });
  const resources = await Promise.all(promises);
  // console.log(resources);
  // console.log(events);
  return {
    props: { resources, events },
    revalidate: 60,
  };
};

const SectionHeader: React.FC<{ title: string }> = ({ title }) => {
  return (
    <Box
      component="h2"
      sx={{
        borderBottom: "3px solid #e35c21",
        pl: 1,
      }}
    >
      {title}
    </Box>
  );
};

const Page: NextPage<Props> = ({ resources, events: eventsRaw }) => {
  const events = useMemo(() => {
    return eventsRaw.flatMap((data, i) => {
      const start = new Date(data.start);
      const end = new Date(data.end);
      return [{ event_id: i, title: data.title, start, end, name: data.name }];
    });
  }, [eventsRaw]);

  return (
    <Box sx={{ mb: 3 }}>
      <Title name="kosen-calendar" />
      <Box sx={{ textAlign: "center", width: "100vw" }}>
        <Box
          component={Logo}
          sx={{
            maxWidth: "500px",
            p: 5,
          }}
        />
      </Box>
      <Box
        sx={{
          px: 5,
        }}
      >
        <Box component="section">
          <SectionHeader title="kosen-calendarとは" />
          <div>
            学校の行事予定って配られるけど、毎年カレンダーに登録するの面倒くさくない？ときどき変更されるし...
            <br />
            そこで「kosen-calendar」の出番。各高専の行事予定をiCalendar形式にて公開しています！
            <br />
            icalは自動更新されるので、学期途中の変更にも対応！
          </div>
        </Box>
        <Box component="section">
          <SectionHeader title="使い方" />
          <div>
            「対応高専」欄のURLをiCalendarに対応しているカレンダーに登録するだけ。
            <br />
            主なサービスについては以下に方法を書いておきます。
            <ul>
              <li>Outlook.com：「予定表を追加」→「Webから定期受信」</li>
              <li>
                Googleカレンダー：「他のカレンダー」横の＋マーク→「URLで追加」
              </li>
              <li>
                iPhoneカレンダー：iPhoneからこのページを開き、追加したい高専のURLをタップ
              </li>
            </ul>
          </div>
        </Box>
        <Box component="section">
          <SectionHeader title="対応高専" />
          <div>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>高専名</TableCell>
                    <TableCell>URL</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {resources.map((resource) => {
                    return (
                      <TableRow key={resource.name}>
                        <TableCell>{resource.name}</TableCell>
                        <TableCell>
                          <Link
                            href={`${githubIoBaseUrl}/${resource.path}`}
                          >{`${githubIoBaseUrl}/${resource.path}`}</Link>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Box>
        <Box
          component="section"
          sx={
            {
              // overflowX: "none",
            }
          }
        >
          <SectionHeader title="カレンダー" />
          <Scheduler
            events={events}
            locale={ja}
            timeZone="Asia/Tokyo"
            view="month"
            resourceViewMode="tabs"
            resources={resources}
            resourceFields={{
              idField: "name",
              textField: "name",
              colorField: "color",
            }}
            month={{
              weekDays: [0, 1, 2, 3, 4, 5, 6],
              weekStartOn: 1,
              startHour: 0,
              endHour: 23,
              cellRenderer: () => <></>,
            }}
            week={{
              weekDays: [0, 1, 2, 3, 4, 5, 6],
              weekStartOn: 1,
              startHour: 0,
              endHour: 23,
              step: 240,
              cellRenderer: () => <></>,
            }}
            day={{
              startHour: 0,
              endHour: 23,
              step: 240,
              cellRenderer: () => <></>,
            }}
            editable={false}
            deletable={false}
            draggable={false}
          />
        </Box>
        <Box component="section">
          <SectionHeader title="協力お願い" />
          <div>
            まだ一部の高専しか作成できていません。協力してくださるよ という方は
            <Link href={githubUrl}> Github</Link>にてPull
            Requestを送ってください。
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default Page;
