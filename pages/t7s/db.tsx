import React, { useEffect, useMemo, useState } from "react";
import { NextPage } from "next";
import Image from "next/image";
import { Box, Tabs, Tab, TextField, InputAdornment, Chip } from "@mui/material";
import DataGrid, { Column, SortColumn, Renderers, Row } from "react-data-grid";
import SearchIcon from "@mui/icons-material/Search";

import { GithubClient } from "../../src/octokit";
import {
  DB as DBType,
  Character,
  Unit,
  Ingame,
  CD,
  DVD,
} from "../../src/t7s-db";
import Title from "../../components/title";

import "react-data-grid/lib/styles.css";
import { useRouter } from "next/router";
import { getQueryAsString } from "../../src/query";

const gh = new GithubClient("kamekyame", "t7s-db");

type DBKey = keyof DBType;
type ColumnSearchType<T> = {
  key: string;
  searchText?: null | ((row: T) => string | number | undefined);
};
type ColumnSort<T = any> = {
  key: string;
  sortFn?: (a: T, b: T, direction: "DESC" | "ASC") => number;
};
type Columns<T> = (Column<T> & ColumnSearchType<T> & ColumnSort<T>)[];

const createUrl = (type: DBKey, q?: string) => {
  let url = "./db?type=" + type;
  if (q) url += "&q=" + q;
  return url;
};

const CharacterImage = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <Box
      sx={{
        height: "100%",
        aspectRatio: "1/1",
        position: "relative",
      }}
    >
      <Image
        src={src}
        alt={alt}
        height={35}
        width={35}
        style={{ objectFit: "contain" }}
      />
    </Box>
  );
};

const ingameColumn: Columns<Ingame> = [
  {
    key: "jacket",
    name: "",
    renderCell: ({ row: { jacketSrc, title } }) => (
      <Image
        src={jacketSrc}
        alt={title + " ジャケット"}
        height={35}
        width={35}
        style={{ objectFit: "contain" }}
      />
    ),
    searchText: null,
    frozen: true,
  },
  { key: "title", name: "タイトル", frozen: true, sortable: true },

  { key: "artist", name: "アーティスト", sortable: true },
  {
    key: "releaseType",
    name: "リリース",
    sortable: true,
    sortFn: ({ releaseType: a }, { releaseType: b }, direction) => {
      if (a === undefined && b === undefined) return 0;
      if (a === undefined) return 1;
      else if (b === undefined) return -1;

      const regExp = /(\d+)(?:st|nd|rd|th) (single|Mini Album)/;
      const aMatch = a.match(regExp);
      const bMatch = b.match(regExp);
      if (aMatch && bMatch) {
        const aNum = Number(aMatch[1]),
          bNum = Number(bMatch[1]);
        const aType = aMatch[2],
          bType = bMatch[2];
        if (aType !== bType) {
          return direction === "ASC"
            ? aType.localeCompare(bType)
            : bType.localeCompare(aType);
        } else {
          return direction === "ASC" ? aNum - bNum : bNum - aNum;
        }
      } else if (aMatch === undefined && bMatch === undefined) {
        return direction === "ASC" ? a.localeCompare(b) : b.localeCompare(a);
      } else if (aMatch === undefined) return 1;
      else if (bMatch === undefined) return -1;
      return 0;
    },
  },
  {
    key: "lyrics",
    name: "作詞",
    sortable: true,
    renderCell: ({ row }) => row.credit.lyrics,
    sortFn: (
      { credit: { lyrics: a } },
      { credit: { lyrics: b } },
      direction
    ) => {
      return direction === "ASC" ? a.localeCompare(b) : b.localeCompare(a);
    },
    searchText: ({ credit: { lyrics } }) => lyrics,
  },
  {
    key: "compose",
    name: "作曲",
    sortable: true,
    renderCell: ({ row }) => row.credit.compose,
    sortFn: (
      { credit: { compose: a } },
      { credit: { compose: b } },
      direction
    ) => {
      return direction === "ASC" ? a.localeCompare(b) : b.localeCompare(a);
    },
    searchText: ({ credit: { compose } }) => compose,
  },
  {
    key: "implementationDate",
    name: "実装日",
    sortable: true,
    renderCell: ({ row }) =>
      new Date(row.implementationDate).toLocaleDateString("ja-JP"),
    sortFn: (
      { implementationDate: a },
      { implementationDate: b },
      direction
    ) => {
      const aDate = new Date(a);
      const bDate = new Date(b);
      return direction === "ASC"
        ? aDate.getTime() - bDate.getTime()
        : bDate.getTime() - aDate.getTime();
    },
  },
  {
    key: "lead",
    name: "詳細",
    renderCell: ({ row }) => {
      return <Box sx={{ fontSize: "0.8em" }}>{row.lead}</Box>;
    },
  },
];
const cdColumn: Columns<CD> = [
  {
    key: "jacket",
    name: "",
    renderCell: ({ row: { jacketSrc, title } }) => (
      <Image
        src={jacketSrc}
        alt={title + " ジャケット"}
        height={35}
        width={35}
        style={{ objectFit: "contain" }}
      />
    ),
    searchText: null,
    frozen: true,
  },
  { key: "title", name: "タイトル", frozen: true, sortable: true },
  { key: "artist", name: "アーティスト", sortable: true },
  { key: "releaseType", name: "種類", sortable: true },
  {
    key: "releaseDate",
    name: "発売日",
    sortable: true,
    renderCell: ({ row }) =>
      new Date(row.releaseDate).toLocaleDateString("ja-JP"),
    sortFn: ({ releaseDate: a }, { releaseDate: b }, direction) => {
      const aDate = new Date(a);
      const bDate = new Date(b);
      return direction === "ASC"
        ? aDate.getTime() - bDate.getTime()
        : bDate.getTime() - aDate.getTime();
    },
  },
  {
    key: "info",
    name: "詳細",
    renderCell: ({ row }) => {
      return <Box sx={{ fontSize: "0.8em" }}>{row.info}</Box>;
    },
  },
];
const dvdColumn: Columns<DVD> = cdColumn;

const unitColumn: Columns<Unit> = [
  { key: "name", name: "名前", sortable: true, frozen: true },
  { key: "group", name: "区分", sortable: true },
  {
    key: "visual",
    name: "ビジュアル",
    renderCell: ({ row: { visualImgSrc, name } }) => (
      <Image
        src={visualImgSrc}
        alt={name + " ビジュアル"}
        height={35}
        width={60}
        style={{ objectFit: "contain" }}
      />
    ),
    searchText: null,
  },
  {
    key: "logo",
    name: "ロゴ",
    renderCell: ({ row: { logoImgSrc, name } }) => (
      <Box
        sx={{
          height: "100%",
          width: "fit-content",
          backgroundColor: "white",
          py: "2px",
          px: "4px",
        }}
      >
        <Image
          src={logoImgSrc}
          alt={name + " ロゴ"}
          height={31}
          width={100}
          style={{ objectFit: "contain" }}
        />
      </Box>
    ),
    searchText: null,
  },
  {
    key: "members",
    name: "メンバー",
    renderCell: ({ row }) => {
      return row.members.map((member) => {
        return (
          <Chip
            key={member.stageName}
            size="small"
            avatar={
              <Image
                style={{ marginLeft: 10, borderRadius: "10%" }}
                width={30}
                height={30}
                src={member.faceImgSrc}
                alt={member.stageName}
              />
            }
            label={member.stageName}
          />
        );
      });
    },
    searchText: (row) =>
      row.members
        .flatMap((member) => [member.stageName, member.name])
        .join(", "),
  },
  {
    key: "info",
    name: "詳細",
    renderCell: ({ row }) => {
      return <Box sx={{ fontSize: "0.8em" }}>{row.info}</Box>;
    },
  },
];

const characterColumn: Columns<Character> = [
  { key: "name", name: "名前", sortable: true, frozen: true },
  {
    key: "img",
    name: "画像",
    width: "max-content",
    renderCell: ({ row: { normalImgSrc, idolImgSrc, imgImgSrc, name } }) => (
      <Box sx={{ height: "100%", display: "flex" }}>
        {normalImgSrc && (
          <CharacterImage src={normalImgSrc} alt={name + " 通常"} />
        )}
        {idolImgSrc && (
          <CharacterImage src={idolImgSrc} alt={name + " アイドル"} />
        )}
        {imgImgSrc && (
          <CharacterImage src={imgImgSrc} alt={name + " イメージ"} />
        )}
      </Box>
    ),
    searchText: null,
  },
  { key: "group", name: "区分", sortable: true },
  {
    key: "age",
    name: "年齢",
    sortable: true,
  },
  {
    key: "birthday",
    name: "誕生日",
    sortable: true,
    renderCell: ({ row }) => {
      return row.birthday ? row.birthday.month + "/" + row.birthday.day : "";
    },
    searchText: (row) => {
      return row.birthday
        ? row.birthday.month + "/" + row.birthday.day
        : undefined;
    },
    sortFn: ({ birthday: a }, { birthday: b }, direction) => {
      if (a === undefined && b === undefined) return 0;
      if (a === undefined) return 1;
      else if (b === undefined) return -1;

      return direction === "ASC"
        ? a.month - b.month || a.day - b.day
        : b.month - a.month || b.day - a.day;
    },
  },
  { key: "bloodType", name: "血液型", sortable: true },
  { key: "height", name: "身長", sortable: true },
  { key: "weight", name: "体重", sortable: true },
  {
    key: "bust",
    name: "バスト",
    renderCell: ({ row }) => row.threeSize?.bust,
    sortable: true,
    searchText: (row) => row.threeSize?.bust,
    sortFn: ({ threeSize: a }, { threeSize: b }, direction) => {
      if (a === undefined && b === undefined) return 0;
      if (a === undefined) return 1;
      else if (b === undefined) return -1;

      return direction === "ASC" ? a.bust - b.bust : b.bust - a.bust;
    },
  },

  {
    key: "waist",
    name: "ウエスト",
    renderCell: ({ row }) => row.threeSize?.waist,
    sortable: true,
    searchText: (row) => row.threeSize?.waist,
    sortFn: ({ threeSize: a }, { threeSize: b }, direction) => {
      if (a === undefined && b === undefined) return 0;
      if (a === undefined) return 1;
      else if (b === undefined) return -1;

      return direction === "ASC" ? a.waist - b.waist : b.waist - a.waist;
    },
  },
  {
    key: "hip",
    name: "ヒップ",
    renderCell: ({ row }) => row.threeSize?.hip,
    sortable: true,
    searchText: (row) => row.threeSize?.hip,
    sortFn: ({ threeSize: a }, { threeSize: b }, direction) => {
      if (a === undefined && b === undefined) return 0;
      if (a === undefined) return 1;
      else if (b === undefined) return -1;

      return direction === "ASC" ? a.hip - b.hip : b.hip - a.hip;
    },
  },
  { key: "cv", name: "CV", sortable: true },
  {
    key: "nickname",
    name: "ニックネーム",
    renderCell: ({ row }) => {
      return row.nickname ? row.nickname.join(", ") : "";
    },
  },
  { key: "skill", name: "特技", sortable: true },
  { key: "favorite", name: "好きなもの", sortable: true },
  { key: "affiliation", name: "所属", sortable: true },
  {
    key: "unit",
    name: "ユニット",
    renderCell: ({ row }) => {
      return row.units.map((unit) => {
        return <Chip key={unit} label={unit} size="small" />;
      });
    },
  },
  {
    key: "info",
    name: "詳細",
    renderCell: ({ row }) => {
      return <Box sx={{ fontSize: "0.8em" }}>{row.info}</Box>;
    },
  },
];

const getSearchTexts: (
  row: any,
  columns: ColumnSearchType<any>[]
) => (string | number)[] = (row, columns) => {
  const texts = columns.flatMap((column): (string | number)[] => {
    let value;
    if (column.searchText === null) {
      return [];
    } else if (column.searchText) {
      value = column.searchText(row);
    } else {
      value = row[column.key];
    }

    if (typeof value === "string") {
      return [value];
    } else if (typeof value === "number") {
      return [value];
    } else if (Array.isArray(value)) {
      return value.map((v) => String(v));
    }
    return [];
  });
  return texts;
};

const defaultColumnOptions = {
  width: "max-content",
  resizable: true,
  minWidth: 0,
};
const rowKeyGutter = (row: { url: string }) => row.url;
const renderers: Renderers<any, any> = {
  renderRow: (key, props) => {
    if (typeof key !== "string") return <></>;
    return (
      <Row
        key={key}
        {...props}
        onDoubleClick={() => window.open(key, "_blank")}
      />
    );
  },
};

const DataView = ({ db, type }: { db: DBType; type: DBKey }) => {
  const router = useRouter();
  const q = getQueryAsString(router.query.q) ?? "";

  const [data, setData] = useState<
    | {
        type: "characters";
        rows: Character[];
        columns: Columns<Character>;
      }
    | {
        type: "units";
        rows: Unit[];
        columns: Columns<Unit>;
      }
    | {
        type: "ingames";
        rows: Ingame[];
        columns: Columns<Ingame>;
      }
    | { type: "cds"; rows: CD[]; columns: Columns<CD> }
    | { type: "dvds"; rows: DVD[]; columns: Columns<DVD> }
  >();

  useEffect(() => {
    setSortColumns([]);
    if (type === "characters") {
      setData({ type, rows: db.characters, columns: characterColumn });
    } else if (type === "units") {
      setData({ type, rows: db.units, columns: unitColumn });
    } else if (type === "ingames") {
      setData({ type, rows: db.ingames, columns: ingameColumn });
    } else if (type === "cds") {
      setData({ type, rows: db.cds, columns: cdColumn });
    } else if (type === "dvds") {
      setData({ type, rows: db.dvds, columns: dvdColumn });
    }
  }, [type, db]);

  const [sortColumns, setSortColumns] = useState<SortColumn[]>([]);
  const [searchText, setSearchText] = useState<string>(q);

  useEffect(() => {
    setSearchText(q);
  }, [q]);

  const sortedRows = useMemo(() => {
    if (!data) return [];
    const searchWords = searchText.split(" ");
    const sortedRows = (data.rows as any[]).filter((row) => {
      const texts = getSearchTexts(row, data.columns);
      const active = searchWords.every((word_) => {
        const word = word_.toLowerCase();
        return texts.some((text) => {
          if (typeof text === "number")
            return String(text).toLowerCase() === word;
          else return text.toLowerCase().includes(word);
        });
      });
      return active;
    });

    for (let i = sortColumns.length - 1; i >= 0; i--) {
      const { columnKey, direction } = sortColumns[i];
      sortedRows.sort((a, b) => {
        const optionalSortFn = (data.columns as ColumnSort[]).find(
          (c) => c.key === columnKey
        )?.sortFn;
        if (optionalSortFn) {
          return optionalSortFn(a, b, direction);
        }
        const aValue = a[columnKey as keyof typeof a];
        const bValue = b[columnKey as keyof typeof b];
        if (aValue === undefined && bValue === undefined) return 0;
        if (aValue === undefined) return 1;
        else if (bValue === undefined) return -1;

        if (typeof aValue === "string" && typeof bValue === "string") {
          return direction === "ASC"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        } else if (typeof aValue === "number" && typeof bValue === "number") {
          return direction === "ASC" ? aValue - bValue : bValue - aValue;
        }

        return 0;
      });
    }
    return sortedRows;
  }, [data, sortColumns, searchText]);

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box sx={{ m: 1 }}>
        <TextField
          variant="standard"
          fullWidth
          placeholder="検索"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          value={searchText}
          onKeyDown={(e) => {
            if (e.key === "Enter" && "value" in e.target) {
              router.replace(createUrl(type, e.target.value as string));
            }
          }}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
      </Box>

      {data?.type === "characters" && (
        <DataGrid
          className={"rdg-light"}
          rows={sortedRows}
          columns={characterColumn}
          sortColumns={sortColumns}
          rowKeyGetter={rowKeyGutter}
          onSortColumnsChange={setSortColumns}
          renderers={renderers}
          style={{ flexGrow: 1 }}
          defaultColumnOptions={defaultColumnOptions}
        />
      )}
      {data?.type === "units" && (
        <DataGrid
          className={"rdg-light"}
          rows={sortedRows}
          columns={unitColumn}
          sortColumns={sortColumns}
          rowKeyGetter={rowKeyGutter}
          onSortColumnsChange={setSortColumns}
          renderers={renderers}
          style={{ flexGrow: 1 }}
          defaultColumnOptions={defaultColumnOptions}
        />
      )}
      {data?.type === "ingames" && (
        <DataGrid
          className={"rdg-light"}
          rows={sortedRows}
          columns={ingameColumn}
          sortColumns={sortColumns}
          rowKeyGetter={rowKeyGutter}
          onSortColumnsChange={setSortColumns}
          renderers={renderers}
          style={{ flexGrow: 1 }}
          defaultColumnOptions={defaultColumnOptions}
        />
      )}
      {data?.type === "cds" && (
        <DataGrid
          className={"rdg-light"}
          rows={sortedRows}
          columns={cdColumn}
          sortColumns={sortColumns}
          rowKeyGetter={rowKeyGutter}
          onSortColumnsChange={setSortColumns}
          renderers={renderers}
          style={{ flexGrow: 1 }}
          defaultColumnOptions={defaultColumnOptions}
        />
      )}
      {data?.type === "dvds" && (
        <DataGrid
          className={"rdg-light"}
          rows={sortedRows}
          columns={dvdColumn}
          sortColumns={sortColumns}
          rowKeyGetter={rowKeyGutter}
          onSortColumnsChange={setSortColumns}
          renderers={renderers}
          style={{ flexGrow: 1 }}
          defaultColumnOptions={defaultColumnOptions}
        />
      )}
    </Box>
  );
};

const DB = ({ db }: { db: DBType }) => {
  const router = useRouter();
  const type: DBKey = getQueryAsString(router.query.type) ?? "characters";

  const changeTab = (_: React.SyntheticEvent, value: DBKey) => {
    router.replace(createUrl(value));
  };

  return (
    <Box
      sx={{ p: 1, height: "100%", display: "flex", flexDirection: "column" }}
    >
      <Box
        sx={{
          top: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.5rem",
        }}
      >
        Tokyo 7th Sisters DataBase
      </Box>
      <Box sx={{ position: "relative" }}>
        <Tabs value={type} onChange={changeTab}>
          <Tab label="Character" value="characters" />
          <Tab label="Unit" value="units" />
          <Tab label="InGame" value="ingames" />
          <Tab label="CD" value="cds" />
          <Tab label="DVD/BD" value="dvds" />
        </Tabs>
      </Box>
      <DataView db={db} type={type} />
    </Box>
  );
};

const Page: NextPage<{}, { type: string }> = ({}) => {
  const [db, setDB] = useState<DBType>();

  useEffect(() => {
    gh.getFileContent("data.json").then((res) => {
      if (!res) return;
      setDB(JSON.parse(res));
    });
  }, []);

  return (
    <Box sx={{ height: "max(calc(100vh - 64px),500px)" }}>
      <Title name="Tokyo 7th Sisters DBType" />
      {db && <DB db={db} />}
    </Box>
  );
};

export default Page;
