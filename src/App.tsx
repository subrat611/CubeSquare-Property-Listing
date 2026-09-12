import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropertyListingPage } from "./pages/PropertyListingPage";

const queryClient = new QueryClient();

function App() {
  return (
    <main>
      <QueryClientProvider client={queryClient}>
        <PropertyListingPage />
      </QueryClientProvider>
    </main>
  );
}

export default App;
