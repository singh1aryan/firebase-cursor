"use client";

import { useState, useEffect } from 'react'
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Filter } from 'lucide-react'
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase'; // Ensure this path is correct
import Link from 'next/link';

// Type definition for the App
interface App {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
}

export default function Home() {
  const [apps, setApps] = useState<App[]>([]);
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedTag, setSelectedTag] = useState("all")

  useEffect(() => {
    const fetchApps = async () => {
      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);
      const appsCollection = collection(db, 'apps');
      const appsSnapshot = await getDocs(appsCollection);
      const appsList = appsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as App));
      setApps(appsList);
    };

    fetchApps();
  }, []);

  // Get unique categories and tags from the apps
  const categories = Array.from(new Set(apps.map(app => app.category)))
  const allTags = Array.from(new Set(apps.flatMap(app => app.tags)))

  const filteredApps = apps.filter(app => 
    app.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === "all" || app.category === selectedCategory) &&
    (selectedTag === "all" || app.tags.includes(selectedTag))
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8 mb-8">
        <div className="lg:w-3/4">
          <h1 className="text-4xl font-bold mb-4">The Best Claude Apps Gallery</h1>
          <p className="text-xl text-gray-600 mb-8">
            Looking for Claude app inspiration? We've got you covered. Our gallery features the
            best Claude-powered apps, templates, components and more. Get inspired by
            real examples curated by us to ensure the highest quality.
          </p>
        </div>

        <div className="lg:w-1/4">
          <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
            <CardHeader className="bg-gray-50 p-6">
              <CardTitle className="text-2xl font-bold">Say goodbye to building Claude apps from scratch</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <CardDescription className="text-gray-600 mb-4">
                With access to over 100 components, you can build beautiful Claude-powered apps
                and save thousands of hours using the world's largest Claude component library.
              </CardDescription>
              <Button className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors">
                Try out now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Input
          type="text"
          placeholder="Search apps..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3"
        />
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full md:w-1/3">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map(category => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedTag} onValueChange={setSelectedTag}>
          <SelectTrigger className="w-full md:w-1/3">
            <SelectValue placeholder="Tag" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tags</SelectItem>
            {allTags.map(tag => (
              <SelectItem key={tag} value={tag}>{tag}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-wrap gap-4 mb-8">
        {categories.map(category => (
          <button
            key={category}
            className="px-4 py-2 bg-gray-200 rounded-full text-sm font-medium"
            onClick={() => setSelectedCategory(category)}
          >
            {category} <span className="text-gray-500">{apps.filter(app => app.category === category).length}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredApps.map(app => (
          <Card key={app.id}>
            <CardHeader>
              <img src={app.image} alt={app.title} className="w-full h-48 object-cover rounded-t-lg" />
            </CardHeader>
            <CardContent>
              <CardTitle>{app.title}</CardTitle>
              <CardDescription>{app.description}</CardDescription>
            </CardContent>
            <CardFooter>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{app.category}</Badge>
                {app.tags.map(tag => (
                  <Badge key={tag} variant="outline">{tag}</Badge>
                ))}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredApps.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No apps found matching your criteria.</p>
      )}
    </div>
  )
}