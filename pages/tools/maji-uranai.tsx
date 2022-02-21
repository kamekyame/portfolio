import { useMemo, useState } from "react";
import { NextPage } from "next";
import {
  Typography,
  Box,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import Title from "../../components/title";

type Data = {
  [key: string]: {
    color?: { lucky: string; unlucky: string };
    zodiac?: { lucky: string; unlucky: string };
  };
};

const colors = {
  lucky: "#F79212",
  unlucky: "#11A7F7",
  diff: "#7AF72A",
};

const colorDict = [
  { data: "赤", color: "red" },
  { data: "オレンジ", color: "orange" },
  { data: "黄色", color: "yellow" },
  { data: "緑", color: "green" },
  { data: "青", color: "blue" },
  { data: "紫", color: "purple" },
  { data: "ピンク", color: "pink" },
  { data: "茶", color: "brown" },
  { data: "白", color: "white" },
  { data: "灰", color: "gray" },
  { data: "黒", color: "black" },
];

const zodiacDict = [
  { data: "おひつじ座", color: "" },
  { data: "おうし座", color: "" },
  { data: "ふたご座", color: "" },
  { data: "かに座", color: "" },
  { data: "しし座", color: "" },
  { data: "おとめ座", color: "" },
  { data: "てんびん座", color: "" },
  { data: "さそり座", color: "" },
  { data: "いて座", color: "" },
  { data: "やぎ座", color: "" },
  { data: "みずがめ座", color: "" },
  { data: "うお座", color: "" },
];

type LuckyUnluckyBarChartData = {
  name: string;
  lucky: number;
  unlucky: number;
}[];

const luckyUnluckyBarChartTypes = ["normal", "diff"] as const;
type LuckyUnluckyBarChartType = typeof luckyUnluckyBarChartTypes[number];

function LuckyUnluckyBarChart({
  data: data_,
  type,
}: {
  data: LuckyUnluckyBarChartData;
  type: LuckyUnluckyBarChartType;
}) {
  const data: (typeof data_[number] & { diff: number })[] = useMemo(() => {
    return data_.map((d) => {
      const diff = d.lucky - d.unlucky;
      return {
        ...d,
        diff,
      };
    });
  }, [data_]);

  return (
    <Box
      component={ResponsiveContainer}
      width="100%"
      maxWidth="800px"
      aspect={3}
      sx={{ fontSize: "0.8em", color: "black" }}
    >
      <BarChart data={data} barCategoryGap="20%" barGap={5}>
        <CartesianGrid strokeDasharray="1 1" />
        <XAxis
          dataKey="name"
          height={50}
          angle={30}
          interval={0}
          dy={15}
          dx={10}
          stroke="white"
        />
        <YAxis width={20} stroke="white" />
        <Legend />
        <Tooltip />
        <Bar hide={type !== "normal"} dataKey="lucky" fill={colors.lucky} />
        <Bar hide={type !== "normal"} dataKey="unlucky" fill={colors.unlucky} />
        <Bar hide={type !== "diff"} dataKey="diff" fill={colors.diff} />
      </BarChart>
    </Box>
  );
}

const Page: NextPage<{ data?: Data }> = ({ data }) => {
  const colorData = useMemo(() => {
    const d: LuckyUnluckyBarChartData = colorDict.map((c) => ({
      name: c.data,
      lucky: 0,
      unlucky: 0,
    }));
    if (data) {
      Object.values(data).forEach(({ color }) => {
        if (!color) return;
        const lucky = d.find((c) => c.name === color.lucky);
        if (lucky) lucky.lucky++;
        const unlucky = d.find((c) => c.name === color.unlucky);
        if (unlucky) unlucky.unlucky++;
      });
    }
    return d;
  }, [data]);
  const zodiacData = useMemo(() => {
    const d: LuckyUnluckyBarChartData = zodiacDict.map((c) => ({
      name: c.data,
      lucky: 0,
      unlucky: 0,
    }));
    if (data) {
      Object.values(data).forEach(({ zodiac }) => {
        if (!zodiac) return;
        const lucky = d.find((c) => c.name === zodiac.lucky);
        if (lucky) lucky.lucky++;
        const unlucky = d.find((c) => c.name === zodiac.unlucky);
        if (unlucky) unlucky.unlucky++;
      });
    }
    return d;
  }, [data]);

  const [type, setType] = useState<LuckyUnluckyBarChartType>("normal");

  return (
    <>
      <Title name="まぁじ占いビューア" />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="title">まぁじ占いビューア</Typography>
        <ToggleButtonGroup
          color="secondary"
          value={type}
          exclusive
          onChange={(_, value) => setType((curr) => value || curr)}
        >
          {luckyUnluckyBarChartTypes.map((type) => (
            <ToggleButton key={type} value={type}>
              {type}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <Box
          sx={{
            my: 1,
            width: "90%",
            display: "flex",
            justifyContent: "center",
            gap: 1,
            flexWrap: "wrap",
          }}
        >
          <LuckyUnluckyBarChart data={colorData} type={type} />
          <LuckyUnluckyBarChart data={zodiacData} type={type} />
        </Box>
      </Box>
    </>
  );
};

Page.getInitialProps = async () => {
  const res = await fetch("https://api.kamekyame.com/maji-uranai/data");
  let data: Data | undefined = undefined;
  if (res.ok) {
    data = await res.json();
  }
  return { data };
};

export default Page;
