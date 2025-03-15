import { ContestType, Platform, ContestInterface } from "@/lib/types";
import { useEffect, useState,useMemo } from "react";
import FilterBar from "./filter-bar";
import { SearchX,Loader2 } from "lucide-react";
import ContestCard from "./contest-card";
import Pagination from "./pagination";
Pagination
export function MainContent() {
  const ITEMS_PER_PAGE = 20;
  const [status, setStatus] = useState<ContestType>("UPCOMING");
  const [selectedPlatform, setSelectedPlatforms] = useState<Platform[]>([]);
  const [showBookmarked, setShowBookmarked] = useState(false);
  const [currPage, setCurrPage] = useState(1);

  const [contests, setContests] = useState<ContestInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getContests = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const res = await fetch("http://localhost:5000/contests");
        const data = await res.json();
        console.log(data);
        setContests(data.contests);
        setIsLoading(false)
      } catch (err) {
        console.log(err);
      }
    };

    getContests();
  }, []);

  const filteredContests = useMemo(() => {
    let filtered = contests.filter((c) => c.status === status);

    if (selectedPlatform.length > 0) {
      filtered = filtered.filter((contest) =>
        selectedPlatform.includes(contest.platform)
      );
    }

   

    return filtered;
  }, [status, selectedPlatform, showBookmarked, contests]);

  const paginatedContests = useMemo(() => {
    const startIndex = (currPage - 1) * ITEMS_PER_PAGE;
    return filteredContests.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredContests, currPage]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredContests.length / ITEMS_PER_PAGE)
  );

  useEffect(() => {
    setCurrPage(1);
  }, [status, selectedPlatform, showBookmarked]);

  return (
    <>
      <div>
        <FilterBar
          status={status}
          setStatus={setStatus}
          selectedPlatforms={selectedPlatform}
          setSelectedPlatforms={setSelectedPlatforms}
          showBookmarked={showBookmarked}
          setShowBookmarked={setShowBookmarked}
        />

<main className="flex-grow container px-4 py-6 md:py-8 md:px-6 mx-auto">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in">
            <Loader2 className="h-12 w-12 text-primary mb-4 animate-spin" />
            <h3 className="text-lg font-medium">Loading contests...</h3>
            <p className="text-muted-foreground mt-1">
              Please wait while we fetch the latest data.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedContests.map((contest) => (
                <ContestCard key={contest._id} contest={contest} />
              ))}
            </div>
            
            {filteredContests.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in">
                <SearchX className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No contests found</h3>
                <p className="text-muted-foreground mt-1">
                  Try adjusting your filters to find what you're looking for.
                </p>
              </div>
            )}
            
            <Pagination 
              currPage={currPage}
              totalPages={totalPages}
              onPageChange={setCurrPage}
            />
          </>
        )}
      </main>

      </div>
    </>
  );
}
