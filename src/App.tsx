import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

interface Technology {
  id: number;
  created_at: string;
  description: string;
  skill_level: string;
}

const tableHeaderStyle = {
  padding: "12px",
  textAlign: "left" as const,
  borderBottom: "2px solid #ddd",
  fontWeight: "bold",
};

const tableCellStyle = {
  padding: "12px",
  textAlign: "left" as const,
};

function App() {
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const fetchTechnologies = async () => {
      try {
        console.log("Fetching from URL:", supabaseUrl);
        const { data, error } = await supabase.from("Technologies").select("*");

        if (error) {
          console.error("Supabase error:", error);
          setError(error.message);
          return;
        }

        if (data) {
          console.log("Received data:", data);
          setTechnologies(data);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      }
    };

    fetchTechnologies();
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ color: "#333", marginBottom: "20px" }}>Technologies</h1>
      {technologies.length === 0 ? (
        <p>Loading technologies...</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              backgroundColor: "white",
              boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: "#f4f4f4",
                  color: "#333",
                }}
              >
                <th style={tableHeaderStyle}>ID</th>
                <th style={tableHeaderStyle}>Date Added</th>
                <th style={tableHeaderStyle}>Description</th>
                <th style={tableHeaderStyle}>Skill Level</th>
              </tr>
            </thead>
            <tbody>
              {technologies.map((tech) => (
                <tr
                  key={tech.id}
                  style={{
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  <td style={tableCellStyle}>{tech.id}</td>
                  <td style={tableCellStyle}>
                    {new Date(tech.created_at).toLocaleDateString()}
                  </td>
                  <td style={tableCellStyle}>{tech.description}</td>
                  <td style={tableCellStyle}>{tech.skill_level}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
