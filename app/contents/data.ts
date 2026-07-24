export const contents: Array<{
  title: string;
  description: string;
  href: string;
  type: "normal" | "el" | "t7s";
  bgImage?: string;
}> = [
  {
    title: "発表資料",
    description: "これまでのカンファレンスなどにおける発表資料をまとめています",
    href: "/contents/slides",
    type: "normal",
  },
  {
    title: "EL-Explorer",
    description: "エレクトーン用のエクスプローラです。",
    href: "/el/explorer",
    type: "el",
  },
  {
    title: "t7s Electone Project",
    description: "ナナシスの曲をエレクトーンアレンジするプロジェクト",
    href: "/t7s/t7s-electone-project",
    type: "t7s",
  },
  {
    title: "t7s DataBase",
    description:
      "ナナシスのキャラ・ユニット・ゲーム内楽曲・CD等のデータが閲覧できるサイト",
    href: "/t7s/db",
    type: "t7s",
  },
  {
    title: "Domino用\nElectone音源定義ファイル",
    description:
      "MIDIエディタ「Domino」でElectoneの資源を最大限活用するための音源定義ファイル",
    href: "/el/domino-define",
    type: "el",
  },
  {
    title: "Electone Regist Font",
    description:
      "エレクトーンの楽譜によく使用されている レジストを表す画像 をフォントとして作ってみました",
    href: "/el/regist-font",
    type: "el",
  },
  {
    title: "t7s 推しカードチェックインスポット マップ",
    description:
      "t7s 全国 推しカードチェックイン!!のチェックポイントをマップ上にプロットしてみました。",
    href: "/t7s/oshicard-checkin-map",
    type: "t7s",
    bgImage:
      "https://pbs.twimg.com/media/GQ6GaiVaQAA9mu5?format=webp&name=small",
  },
  {
    title: "t7s GWチェックインスポット マップ",
    description:
      "t7s GWキャンペーン ニッポン全国チェックインイベント!!のチェックポイントをマップ上にプロットしてみました。",
    href: "/t7s/gw-checkin-map",
    type: "t7s",
    bgImage:
      "https://pbs.twimg.com/media/FuOEtVDaUAEce8Q?format=png&name=large",
  },
  {
    title: "kosen-calendar",
    description: "高専ごとのカレンダーをiCalendar形式で公開しています。",
    href: "contents/kosen-calendar",
    type: "normal",
  },
  {
    title: "2024年エイプリルフール\nタイトル画面集",
    description:
      "t7s 2024年のエイプリルフールにゲームのタイトル画面で表示されていた画像をまとめています。",
    href: "/t7s/illust/2024-aprilfools_day",
    bgImage: "/img/t7s/illust/2024-april_fool-nanasisu_dot.webp",
    type: "t7s",
  },
  {
    title: "2024年ゲーム10周年記念\nタイトル画面集",
    description:
      "t7s 2024年2月19日のゲーム10周年に合わせてゲームのタイトル画面で表示されていた画像をまとめています。",
    href: "/t7s/illust/2024-10th_game_startup",
    type: "t7s",
    bgImage: "https://t7s.jp/10th_anniversary/assets/images/kv/kv_pc_04.png",
  },
  {
    title: "Le☆S☆Ca 1st Live\nカウントダウンイラスト集",
    description:
      "t7s Le☆S☆Ca 1st Liveのカウントダウンで公式が投稿したイラストをまとめています。",
    href: "/t7s/illust/lesca-1stlive-countdown",
    type: "t7s",
    bgImage: "https://t7s.jp/live/lesca1stlive/top/img/main.png",
  },
  {
    title: "2053 1st Live Startrail\nカウントダウンイラスト集",
    description:
      "t7s 2053 1st Live Startrailのカウントダウンで公式が投稿したイラストをまとめています。",
    href: "/t7s/illust/2053-1stlive-countdown",
    type: "t7s",
    bgImage: "https://t7s.jp/live/startrail/top/img/main.png",
  },
  {
    title: "2023年エイプリルフール\nタイトル画面集",
    description:
      "t7s 2023年のエイプリルフールにゲームのタイトル画面で表示されていた画像をまとめています。",
    href: "/t7s/illust/2023-aprilfools_day",
    type: "t7s",
    bgImage: "/img/t7s/illust/2023-april_fool-nanasisu_walk.webp",
  },
  {
    title: "ナナシス履歴書ギャラリー",
    description:
      "ナナシス支配人がTwitterにあげている履歴書を一覧で見ることができます。",
    href: "/t7s/resume",
    type: "t7s",
  },
  {
    title: "まぁじ占いビューア",
    description: "まぁじ占いの結果を一覧で見ることができます。",
    href: "contents/maji-uranai",
    type: "normal",
  },

  {
    title: "My-Electone",
    description:
      "すずともが過去に弾いてきた曲たちを忘備録としてまとめています。",
    href: "/contents/my-electone",
    type: "normal",
  },
];
