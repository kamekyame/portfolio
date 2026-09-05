"use client";

import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import s from "./Contents.module.scss";

export type Data = {
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
  { data: "おひつじ座", sign: "♈" },
  { data: "おうし座", sign: "♉" },
  { data: "ふたご座", sign: "♊" },
  { data: "かに座", sign: "♋" },
  { data: "しし座", sign: "♌" },
  { data: "おとめ座", sign: "♍" },
  { data: "てんびん座", sign: "♎" },
  { data: "さそり座", sign: "♏" },
  { data: "いて座", sign: "♐" },
  { data: "やぎ座", sign: "♑" },
  { data: "みずがめ座", sign: "♒" },
  { data: "うお座", sign: "♓" },
];

type LuckyUnluckyBarChartData = {
  name: string;
  lucky: number;
  unlucky: number;
}[];

const luckyUnluckyBarChartTypes = ["normal", "diff"] as const;
type LuckyUnluckyBarChartType = (typeof luckyUnluckyBarChartTypes)[number];

function LuckyUnluckyBarChart({
  data: data_,
  type,
}: {
  data: LuckyUnluckyBarChartData;
  type: LuckyUnluckyBarChartType;
}) {
  const data: ((typeof data_)[number] & { diff: number })[] = useMemo(() => {
    return data_.map((d) => {
      const diff = d.lucky - d.unlucky;
      return {
        ...d,
        diff,
      };
    });
  }, [data_]);

  return (
    <ResponsiveContainer
      width="100%"
      aspect={3}
      className={s["chart-container"]}
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
        />
        <YAxis width="auto" />
        <Legend />
        <Tooltip />
        <Bar hide={type !== "normal"} dataKey="lucky" fill={colors.lucky} />
        <Bar hide={type !== "normal"} dataKey="unlucky" fill={colors.unlucky} />
        <Bar hide={type !== "diff"} dataKey="diff" fill={colors.diff} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default function Contents({ data }: { data: Data }) {
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
    <div className={s["contents"]}>
      <div
        className={s["chart-type-selector"]}
        role="group"
        aria-label="グラフの表示形式"
      >
        {luckyUnluckyBarChartTypes.map((chartType) => (
          <button
            className={s["chart-type-button"]}
            key={chartType}
            type="button"
            aria-pressed={chartType === type}
            onClick={() => setType(chartType)}
          >
            {chartType}
          </button>
        ))}
      </div>
      <div className={s["chart-area"]}>
        <LuckyUnluckyBarChart data={colorData} type={type} />
        <LuckyUnluckyBarChart data={zodiacData} type={type} />
      </div>
    </div>
  );
}
