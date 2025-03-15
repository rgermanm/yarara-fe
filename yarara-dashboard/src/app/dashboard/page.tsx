'use client'
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { LogIn, Eye, Trash2, Folder, User as UserIcon } from "lucide-react";
import { ApiResponse, User } from "@/types/interfaces";

const isLoggedIn = false; // Simulate authentication state
const projects = ["Project A", "Project B", "Project C"];
const scans = [
  { name: "Scan 1", repo: "Repo A", date: "2024-03-10", vulnerabilities: 3 },
  { name: "Scan 2", repo: "Repo B", date: "2024-03-05", vulnerabilities: 0 }
];


export default function Dashboard() {


  const [search, setSearch] = useState("");
  const [logedUser,setLogedUser]=useState<User | null>(null);
  useEffect(() => {
    fetch("http://localhost:5000/api/user", { credentials: "include" })
      .then(res => res.json())
      .then((data: ApiResponse) => {
        setLogedUser(data.user); // Set the logged-in user
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const [repoList, setRepoList] = useState([]);


  const handleAddScan =()=>{
    fetch("http://localhost:5000/api/repos", { credentials: "include" })
    .then(res => res.json())
    .then((data) => {
      setRepoList(data); // Set the logged-in user
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
    });
  }


  return (
    <div className="flex h-screen w-full bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-gray-800 to-gray-900 text-white p-4 border-r border-gray-700">
        <h2 className="text-xl font-bold mb-6 text-gray-100">Projects</h2>
        <ul className="space-y-2">
          {projects.map((project, index) => (
            <li
              key={index}
              className="flex items-center p-2 gap-2 hover:bg-gray-700 cursor-pointer rounded-md transition-colors duration-200"
            >
              <Folder size={16} className="text-gray-300" />
              <span className="text-gray-200">{project}</span>
            </li>
          ))}
        </ul>
      </aside>


      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg p-4">
          <div className="flex items-center gap-2">
            <UserIcon size={24} className="text-gray-200" />
            <span className="text-lg font-bold text-gray-100">Dashboard</span>
          </div>
          <div>
            {logedUser?.id ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Badge variant="outline" className="cursor-pointer bg-gray-700 hover:bg-gray-600 text-gray-100 border-gray-600 transition-colors duration-200">
                    User ▼
                  </Badge>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-gray-800 border border-gray-700 rounded-md shadow-lg cursor-pointer">
                  <DropdownMenuItem className="p-2 hover:bg-gray-700 rounded-md text-gray-100 cursor-pointer">Profile</DropdownMenuItem>
                  <DropdownMenuItem className="p-2 hover:bg-gray-700 rounded-md text-gray-100 curosr-pointer">Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={() => window.location.href = "http://localhost:5000/auth/github"}
                className="flex gap-2 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-gray-100 transition-all duration-200"
              >
                <LogIn size={16} /> Login with GitHub
              </Button>
            )}
          </div>
        </header>

        {/* Table section */}
        <main className="p-6">
          <div className="flex justify-between mb-6">
            <Input
              placeholder="Search scans..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-1/3 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-gray-500 focus:border-gray-500 rounded-md transition-all duration-200"
            />
            <Button onClick={()=>{handleAddScan()}} className="bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-gray-100 transition-all duration-200">
              Add Scan
            </Button>
          </div>
          <Card className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="p-3 text-left text-gray-700 dark:text-gray-200">Name</th>
                  <th className="p-3 text-left text-gray-700 dark:text-gray-200">Repository</th>
                  <th className="p-3 text-left text-gray-700 dark:text-gray-200">Scan Date</th>
                  <th className="p-3 text-left text-gray-700 dark:text-gray-200">Vulnerabilities</th>
                  <th className="p-3 text-left text-gray-700 dark:text-gray-200">Actions</th>
                </tr>
              </thead>
              <tbody>
                {scans.map((scan, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <td className="p-3 text-gray-700 dark:text-gray-200 hover:text-gray-800 dark:hover:text-gray-100">{scan.name}</td>
                    <td className="p-3 text-gray-700 dark:text-gray-200 hover:text-gray-800 dark:hover:text-gray-100">{scan.repo}</td>
                    <td className="p-3 text-gray-700 dark:text-gray-200 hover:text-gray-800 dark:hover:text-gray-100">{scan.date}</td>
                    <td className="p-3 text-center text-gray-700 dark:text-gray-200 hover:text-gray-800 dark:hover:text-gray-100">{scan.vulnerabilities}</td>
                    <td className="p-3 flex gap-2 justify-center">
                      <Eye size={16} className="cursor-pointer text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-200" />
                      <Trash2 size={16} className="cursor-pointer text-red-500 hover:text-red-600 transition-colors duration-200" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </main>
      </div>
    </div>
  );
}