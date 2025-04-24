import { type Folder, mockFiles, mockFolders } from "~/lib/mock-data";
import { db } from "~/server/db";
import { files, folders } from "~/server/db/schema";

export default function SandboxPage() {
  return (
    <div className="flex flex-col gap-4">
      Seed Function
      <form action={async () => {
        "use server";

        await db.insert(folders).values(mockFolders.map((folder, index) => ({
          id: index + 1,
          name: folder.name,
          parent: index !== 0 ? 1 : null
        })));
        await db.insert(files).values(mockFiles.map((file, index) => ({
          id: index + 1,
          name: file.name,
          url: file.url,
          parent: (index % 3) + 1,
          size: 50000
        })));
      }}>
        <button type="submit">Seed</button>
      </form>
    </div>
  )
}