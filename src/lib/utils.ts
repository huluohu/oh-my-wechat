import { type ClassValue, clsx } from "clsx";
import type { Database } from "sql.js";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function decodeHTMLComponent(encodedHTMLComponent: string) {
  return encodedHTMLComponent.replace(/&#x(.*?);/g, (_, p1) =>
    String.fromCodePoint(Number.parseInt(p1, 10)),
  );
}

type FileList = {
  filename: string;
  file: File;
}[];

export async function getFileFromManifast(
  manifestDatabase: Database,
  directoryHandle: FileSystemDirectoryHandle,
  fileNamePattern: string,
): Promise<FileList> {
  const rows = manifestDatabase.exec(
    `SELECT * FROM "Files" WHERE "domain" = "AppDomain-com.tencent.xin" AND "relativePath" LIKE "${fileNamePattern}" AND "flags" = 1`,
  );

  const fileList: FileList = [];

  for (const row of rows[0].values) {
    const manifestFileName = row[0] as string;
    const fileFullName = row[2] as string;
    const fileName = fileFullName.split("/").pop() as string;
    if (manifestFileName.length === 0) continue;
    const filePrefix = manifestFileName.substring(0, 2);
    const file = await getDirectoryFile(directoryHandle, [
      filePrefix,
      manifestFileName,
    ]);
    if (file) fileList.push({ filename: fileName, file });
  }

  return fileList;
}

export async function getDirectoryFile(
  directoryHandle: FileSystemDirectoryHandle,
  fileName: string | string[],
) {
  if (fileName.length === 0) return null;

  const fileNameSegment = Array.isArray(fileName)
    ? fileName
    : fileName.split("/");
  const fileNameSegmentLength = fileNameSegment.length;

  if (fileNameSegmentLength === 1) {
    const fileHandle = await directoryHandle.getFileHandle(fileNameSegment[0]);
    return await fileHandle.getFile();
  }

  if (fileNameSegmentLength > 1) {
    const subDirectoryHandle = await directoryHandle.getDirectoryHandle(
      fileNameSegment[0],
    );
    return getDirectoryFile(subDirectoryHandle, fileNameSegment.splice(1));
  }
}
