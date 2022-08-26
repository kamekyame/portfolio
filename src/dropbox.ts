import { Dropbox } from "dropbox";

export async function getDropboxClient() {
  const formData = new URLSearchParams();
  formData.append("grant_type", "refresh_token");
  formData.append("refresh_token", process.env.DROPBOX_REFRESH_TOKEN ?? "");
  formData.append("client_id", process.env.DROPBOX_API_KEY ?? "");
  formData.append("client_secret", process.env.DROPBOX_API_SECRET ?? "");
  const res = await fetch("https://api.dropbox.com/oauth2/token", {
    method: "POST",
    body: formData,
  });
  const { access_token: accessToken } = await res.json();
  const dbx = new Dropbox({ accessToken });
  return dbx;
}

export async function getDataList() {
  const dbx = await getDropboxClient();

  try {
    const filesListFolder = await dbx.filesListFolder({
      path: "/t7s_Electone_Project_data",
    });
    const list: Array<{
      fileName: string;
      type: "data" | "pdf";
      downloadUrl: string;
    }> = [];
    for await (const file of filesListFolder.result.entries) {
      // console.log(file);
      const filePath = file.path_lower;
      if (!filePath) continue;
      const fileNameSplit = file.name.split(".");
      const fileName = fileNameSplit[0];
      const type = fileNameSplit[1] === "pdf" ? "pdf" : "data";

      const downloadUrl = await getDownloadUrl(dbx, file.path_lower ?? "");
      // console.log(downloadUrl);

      list.push({ fileName, type, downloadUrl });
    }
    // console.log(list);
    return list;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function getDownloadUrl(dbx: Dropbox, path: string) {
  try {
    const filesGetTemporaryLink = await dbx.filesGetTemporaryLink({ path });
    // console.log(filesGetTemporaryLink);
    return filesGetTemporaryLink.result.link;
  } catch (e) {
    console.error(e);
    return "";
  }
}
