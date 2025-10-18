import React, { useEffect, useState, useContext } from "react";
import { Box, Grid, Paper, Typography, CircularProgress, useTheme } from "@mui/material";
import axios from "axios";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS_LIGHT = ["#2196f3", "#4caf50", "#ff9800", "#f44336"];
const COLORS_DARK = ["#90caf9", "#66bb6a", "#ffa726", "#ef5350"];

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const theme = useTheme(); // MUI theme
  const colors = theme.palette.mode === "dark" ? COLORS_DARK : COLORS_LIGHT;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/reports", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const reports = response.data;

        const total = reports.length;
        const pending = reports.filter((r) => r.status === "Pending").length;
        const resolved = reports.filter((r) => r.status === "Resolved").length;
        const rejected = reports.filter((r) => r.status === "Rejected").length;

        setStats({ total, pending, resolved, rejected });
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  if (!stats)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="70vh">
        <CircularProgress />
      </Box>
    );

  const chartData = [
    { name: "Pending", value: stats.pending },
    { name: "Resolved", value: stats.resolved },
    { name: "Rejected", value: stats.rejected },
  ];

  return (
    <Box p={4}>
      <Typography variant="h5" fontWeight={700} mb={3}>
        Dashboard Overview
      </Typography>

      {/* Stat Cards */}
      <Grid container spacing={3}>
        {[
          { label: "Total Reports", value: stats.total },
          { label: "Pending", value: stats.pending },
          { label: "Resolved", value: stats.resolved },
          { label: "Rejected", value: stats.rejected },
        ].map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              elevation={4}
              sx={{
                p: 3,
                textAlign: "center",
                borderRadius: 3,
                transition: "0.3s",
                bgcolor: theme.palette.background.paper,
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 6,
                },
              }}
            >
              <Typography variant="subtitle1" color="text.secondary">
                {card.label}
              </Typography>
              <Typography variant="h4" fontWeight={700}>
                {card.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Pie Chart */}
      <Paper
        elevation={4}
        sx={{
          mt: 4,
          p: 3,
          borderRadius: 3,
          height: 350,
          display: "flex",
          justifyContent: "center",
          bgcolor: theme.palette.background.paper,
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={chartData} dataKey="value" cx="50%" cy="50%" outerRadius={100} label>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: theme.palette.background.paper,
                borderRadius: 8,
                border: `1px solid ${theme.palette.divider}`,
                color: theme.palette.text.primary,
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
}
