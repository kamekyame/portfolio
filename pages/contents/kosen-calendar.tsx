import React from "react";
import type { NextPage } from "next";
import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

import Title from "../../components/title";
import Link from "../../src/link";

import Logo from "../../assets/kosen-calendar.svg";

type Resource = { name: string; path: string };

const googleCalendarIframeUrl =
  "https://calendar.google.com/calendar/embed?wkst=1&ctz=Asia%2FTokyo&showPrint=0&title=kosen-calendar&showTz=0&src=ZGNvZTF0OWk5ZHZjMjY1MWxqcTNvYWJkdjd0dWhxNW9AaW1wb3J0LmNhbGVuZGFyLmdvb2dsZS5jb20&src=OHNnczU3MmhiaXI4MWxxYXViNW84azF0OXBpNzBxZHRAaW1wb3J0LmNhbGVuZGFyLmdvb2dsZS5jb20&src=NmZnNHZkM203MWk5Y2NrMTZ1NGlybXQ1Nmk2cmczY2FAaW1wb3J0LmNhbGVuZGFyLmdvb2dsZS5jb20&src=bnNxbnRnbGZhaWlscjhzcmU4bzRkdTVsbmlybDQwaDlAaW1wb3J0LmNhbGVuZGFyLmdvb2dsZS5jb20&src=aGllcmlvZDgxOHNna2pla2Q4aHR2djNrdWUwcWFycmpAaW1wb3J0LmNhbGVuZGFyLmdvb2dsZS5jb20&color=%237cb342&color=%237986cb&color=%23ad1457&color=%23616161&color=%23616161";

const resources: Resource[] = [
  { name: "北九州高専", path: "kitakyusyu/kitakyusyu.ics" },
  { name: "福井高専", path: "fukui/fukui.ics" },
  { name: "石川高専2021", path: "ishikawa/ishikawa_2021.ics" },
  { name: "長岡高専", path: "nagaoka/nagaoka.ics" },
  { name: "津山高専", path: "tsuyama/tsuyama.ics" },
];

const githubIoBaseUrl =
  "https://raw.githubusercontent.com/kamekyame/kosen-calendar/main";
const githubUrl = "https://github.com/kamekyame/kosen-calendar";

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

const Page: NextPage = () => {
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

        <Box component="section">
          <SectionHeader title="カレンダープレビュー" />
          <iframe
            style={{
              width: "100%",
              minHeight: "400px",
              aspectRatio: "16/9",
              border: "none",
            }}
            src={googleCalendarIframeUrl}
          ></iframe>
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
