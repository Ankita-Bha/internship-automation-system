import { useEffect, useState } from "react";
import axios from "axios";

export default function ApplicationStatus() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplicationStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://127.0.0.1:5000/application-status", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.status === "success") {
        setApplications(response.data.applications);
      } else {
        console.error("Failed to fetch application status");
      }
    } catch (error) {
      console.error("Error fetching application status:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicationStatus();
  }, []);

  // Status color mapping based on your scheme
  const statusColors = {
    Applied: "#3B82F6",      // Blue
    "In Review": "#FBBF24",  // Yellow
    Rejected: "#EF4444",     // Red
    Accepted: "#10B981",     // Green
  };

  // Common styles for the container and cards
  const styles = {
    container: {
      padding: "1rem",
      backgroundColor: "#FFF9F4",
      minHeight: "100vh",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: "#0F172A", // Text Dark
    },
    header: {
      fontSize: "1.75rem",
      fontWeight: "700",
      marginBottom: "1rem",
      color: "#1E293B", // Slightly lighter text dark
    },
    card: {
      border: "1px solid #E5E7EB", // Divider
      padding: "1rem",
      borderRadius: "0.5rem",
      boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
      backgroundColor: "#FFFFFF",
    },
    jobTitle: {
      fontSize: "1.25rem",
      fontWeight: "700",
      marginBottom: "0.25rem",
    },
    jobDescription: {
      color: "#475569", // Text Medium
      marginBottom: "0.5rem",
      lineHeight: "1.4",
    },
    status: (status) => ({
      fontWeight: "600",
      color: statusColors[status] || "#6B7280", // Text Medium fallback
    }),
    loading: {
      color: "#6B7280", // Text Medium
    },
    emptyState: {
      fontStyle: "italic",
      color: "#94A3B8", // Text Light
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Your Applications</h1>

      {loading ? (
        <p style={styles.loading}>Loading...</p>
      ) : applications.length === 0 ? (
        <p style={styles.emptyState}>You have not applied to any jobs yet.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {applications.map((app) => (
            <div key={app.application_id} style={styles.card}>
              <h2 style={styles.jobTitle}>{app.job_title}</h2>
              <p style={styles.jobDescription}>{app.job_description}</p>
              <p style={styles.status(app.status)}>Status: {app.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
