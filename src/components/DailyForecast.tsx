import { Box, Typography, Card, CardContent, Stack } from "@mui/material";
import { useDailyForecast } from "../hooks/useDailyForecast";
import { ProcessedDay } from "../api/types";
import { useTranslation } from "react-i18next";

const DailyCard = ({ day }: { day: ProcessedDay }) => (
  <Card
    sx={{
      transition: "all 0.3s ease",
      "&:hover": {
        transform: "translateX(8px)",
      },
    }}
  >
    <CardContent sx={{ p: "12px 20px !important" }}>
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        justifyContent="space-between"
      >
        {/* Fecha */}
        <Box sx={{ minWidth: 100 }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 700,
              textTransform: "capitalize",
              lineHeight: 1.2,
            }}
          >
            {day.dayName}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {day.formattedDate}
          </Typography>
        </Box>

        {/* Icono y Clima */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            flexGrow: 1,
            justifyContent: "center",
          }}
        >
          <Box
            component="img"
            src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
            alt="clima"
            sx={{ width: 48, height: 48 }}
          />
          <Typography
            variant="body2"
            sx={{
              textTransform: "capitalize",
              fontWeight: 500,
              display: { xs: "none", sm: "block" },
            }}
          >
            {day.description}
          </Typography>
        </Box>

        {/* Temperaturas */}
        <Box sx={{ textAlign: "right", minWidth: 80 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              color: "primary.main",
              display: "flex",
              alignItems: "baseline",
              justifyContent: "flex-end",
              gap: 1,
            }}
          >
            {Math.round(day.maxTemp)}°
            <Typography
              component="span"
              variant="body2"
              color="text.secondary"
              sx={{ fontWeight: 400 }}
            >
              {Math.round(day.minTemp)}°
            </Typography>
          </Typography>
        </Box>
      </Stack>
    </CardContent>
  </Card>
);

const DailyForecast = () => {
  const { days, loading, weather } = useDailyForecast();
  const { t } = useTranslation();

  if (loading && !weather) return null;
  if (!weather) return null;

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, px: 1 }}>
        {t('dailyForecastTitle')}
      </Typography>

      <Stack spacing={1.5} sx={{ flexGrow: 1 }}>
        {days.map((day, index) => (
          <DailyCard day={day} key={index} />
        ))}
      </Stack>
    </Box>
  );
};

export default DailyForecast;
