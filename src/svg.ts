// 参考サイト：https://std9.jp/articles/01fz9fve2cykj764xqqtbrc1dt

import opentype from "opentype.js";
const cwd = process.cwd();
const font = opentype.loadSync(cwd + "/assets/NotoSansJP-Medium.otf");

/**
 * 生成するテキストのオプション
 */
export type TextOptions = {
  align?: `left` | `right` | `center`;
  color?: string;
  lines?: number;
};

/**
 * 指定した文字列からSVGパスを生成する
 */
export function generateTextPath(
  text: string,
  width: number,
  lineHight: number,
  textOptions_?: TextOptions,
) {
  // テキストオプションのデフォルト値を設定
  const textOptions = {
    align: textOptions_?.align ?? `left`,
    color: textOptions_?.color ?? `#000`,
    lines: textOptions_?.lines ?? 1,
  };

  // opentype: 描画オプション
  const renderOptions: opentype.RenderOptions = {};

  const columns = [``];

  // STEP1: 改行位置を算出して行ごとに分解
  for (let i = 0; i < text.length; i++) {
    // 1文字取得
    const char = text.charAt(i);

    // opentype: 改行位置を算出する為に長さを計測
    const measureWidth = font.getAdvanceWidth(
      columns[columns.length - 1] + char,
      lineHight,
      renderOptions,
    );

    // 改行位置を超えている場合
    if (width < measureWidth) {
      // 次の行にする
      columns.push(``);
    }

    // 現在行に1文字追加
    columns[columns.length - 1] += char;
  }

  const paths: opentype.Path[] = [];

  // STEP2: 行ごとにSVGパスを生成
  for (let i = 0; i < columns.length; i++) {
    // opentype: 1行の長さを計測
    const measureWidth = font.getAdvanceWidth(
      columns[i],
      lineHight,
      renderOptions,
    );

    let offsetX = 0;

    // 揃える位置に応じてオフセットを算出
    if (textOptions.align === `right`) {
      offsetX = width - measureWidth;
    } else if (textOptions.align === `center`) {
      offsetX = (width - measureWidth) / 2;
    } else {
      offsetX = 0;
    }

    // opentype: １行分の文字列をパスに変換
    const path = font.getPath(
      columns[i],
      offsetX,
      lineHight * i + lineHight,
      lineHight,
      renderOptions,
    );

    // 文字色を指定
    path.fill = textOptions.color ?? "#000";

    paths.push(path);
  }

  // STEP3: 指定した行数を超えていれば制限する
  if (textOptions.lines < paths.length) {
    paths.length = textOptions.lines;
  }

  // STEP4: 複数行を結合
  return paths.map((path) => path.toSVG(2)).join();
}
