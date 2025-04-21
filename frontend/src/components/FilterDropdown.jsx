import { useEffect, useState } from "react";
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "@/components/ui/select";

export default function FilterDropdown({ notes, selectedTag, onChange }) {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const uniqueTags = Array.from(new Set(notes.map(note => note.tag).filter(Boolean)));
    setTags(uniqueTags);
  }, [notes]);

  return (
    <Select value={selectedTag} onValueChange={onChange}>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Filter by tag" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="">All</SelectItem>
        {tags.map(tag => (
          <SelectItem key={tag} value={tag}>
            {tag}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
