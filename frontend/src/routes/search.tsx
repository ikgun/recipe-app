import { createFileRoute, useSearch } from "@tanstack/react-router";
import SearchResult from "../components/SearchResult";

export const Route = createFileRoute("/search")({
  validateSearch: (search) => {
    return {
      query: String(search.query ?? ''), 
    }
  },
  component: Search,
});

function Search() {
  const search = useSearch({ from: "/search" });
  return <SearchResult query={search.query} />;
}
