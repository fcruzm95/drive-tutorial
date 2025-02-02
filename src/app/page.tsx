"use client"

import { useState } from "react"
import { Folder, File, Upload, ChevronRight } from "lucide-react"
import { Button } from "~/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"

type Item = {
  id: string
  name: string
  type: "file" | "folder"
  size?: string
  children?: Item[]
}

const mockData: Item[] = [
  {
    id: "1",
    name: "Documents",
    type: "folder",
    size: "--",
    children: [
      { id: "2", name: "Resume.pdf", type: "file", size: "1.2 MB" },
      { id: "3", name: "Cover Letter.docx", type: "file", size: "500 KB" },
    ],
  },
  {
    id: "4",
    name: "Photos",
    type: "folder",
    size: "--",
    children: [
      { id: "5", name: "Vacation.jpg", type: "file", size: "3.5 MB" },
      {
        id: "6",
        name: "Family",
        type: "folder",
        size: "--",
        children: [{ id: "7", name: "Birthday.png", type: "file", size: "2.1 MB" }],
      },
    ],
  },
  { id: "8", name: "Project.zip", type: "file", size: "10.5 MB" },
]

const DriveItem = ({ item, onNavigate }: { item: Item; onNavigate: (item: Item) => void }) => {
  return (
    <TableRow className="cursor-pointer hover:bg-gray-700" onClick={() => onNavigate(item)}>
      <TableCell className="font-medium">
        <div className="flex items-center space-x-2">
          {item.type === "folder" ? <Folder className="text-blue-400" /> : <File className="text-gray-400" />}
          <span>{item.name}</span>
        </div>
      </TableCell>
      <TableCell>{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</TableCell>
      <TableCell>{item.size}</TableCell>
    </TableRow>
  )
}

export default function GoogleDriveClone() {
  const [currentFolder, setCurrentFolder] = useState<Item[]>(mockData)
  const [breadcrumbs, setBreadcrumbs] = useState<Item[]>([
    { id: "root", name: "My Drive", type: "folder", children: mockData },
  ])

  const handleUpload = () => {
    alert("Upload functionality would be implemented here")
  }

  const navigateToFolder = (item: Item) => {
    if (item.type === "folder") {
      setCurrentFolder(item.children || [])
      setBreadcrumbs([...breadcrumbs, item])
    }
  }

  const navigateToBreadcrumb = (index: number) => {
    const newBreadcrumbs = breadcrumbs.slice(0, index + 1)
    setBreadcrumbs(newBreadcrumbs)
    const targetFolder = newBreadcrumbs[newBreadcrumbs.length - 1]
    if (targetFolder?.id === "root") {
      setCurrentFolder(mockData)
    } else {
      setCurrentFolder(targetFolder?.children || [])
    }
  }

  return (
    <div className="container mx-auto p-4 text-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Google Drive Clone</h1>
        <Button onClick={handleUpload} variant="outline">
          <Upload className="mr-2 h-4 w-4" /> Upload
        </Button>
      </div>
      <div className="flex items-center space-x-2 mb-4">
        {breadcrumbs.map((item, index) => (
          <div key={item.id} className="flex items-center">
            {index > 0 && <ChevronRight className="h-4 w-4 mx-1" />}
            <span className="cursor-pointer hover:underline" onClick={() => navigateToBreadcrumb(index)}>
              {item.name}
            </span>
          </div>
        ))}
      </div>
      <div className="border border-gray-700 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Size</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentFolder.map((item) => (
              <DriveItem key={item.id} item={item} onNavigate={navigateToFolder} />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

