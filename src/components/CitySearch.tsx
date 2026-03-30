import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCity } from "../redux/weatherSlice";
import {
  TextField,
  Autocomplete,
  Box,
  alpha,
  CircularProgress,
  Typography,
} from "@mui/material";
import { Search, LocationOn } from "@mui/icons-material";
import { getCitySuggestions } from "../api/weatherService";
import { CitySuggestion } from "../api/types";
import { RootState } from "../redux/store";

const CitySearch = () => {
  const dispatch = useDispatch();
  const { language } = useSelector((state: RootState) => state.weather);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<CitySuggestion[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  // Traductor de nombres de países
  const countryNames = useMemo(
    () =>
      new Intl.DisplayNames([language === "es" ? "es" : "en"], {
        type: "region",
      }),
    [language],
  );

  useEffect(() => {
    let active = true;

    if (inputValue.length < 3) {
      setOptions([]);
      return undefined;
    }

    setLoading(true);

    const timer = setTimeout(async () => {
      const suggestions = await getCitySuggestions(inputValue);
      if (active) {
        setOptions(suggestions || []);
        setLoading(false);
      }
    }, 400);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [inputValue]);

  return (
    <Autocomplete
      id="city-search-autocomplete"
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      isOptionEqualToValue={(option, value) =>
        option.name === value.name && option.country === value.country
      }
      getOptionLabel={(option) =>
        typeof option === "string"
          ? option
          : `${option.name}${option.state ? `, ${option.state}` : ""} — ${countryNames.of(option.country)}`
      }
      options={options}
      loading={loading}
      onInputChange={(_, newInputValue) => {
        setInputValue(newInputValue);
      }}
      onChange={(_, newValue) => {
        if (newValue && typeof newValue !== "string") {
          dispatch(setCity(newValue.name));
        }
      }}
      sx={{
        flexGrow: 1,
        maxWidth: { xs: "100%", sm: 500, md: 700 }, // Aumentado el ancho significativamente
        mx: { xs: 0, sm: 4 },
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={
            language === "es"
              ? "Busca tu ciudad (ej. Santa Cruz)..."
              : "Search your city..."
          }
          variant="outlined"
          size="small"
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "24px",
              backgroundColor: (theme) =>
                alpha(theme.palette.background.paper, 0.15),
              px: 2,
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: (theme) =>
                  alpha(theme.palette.background.paper, 0.25),
              },
              "&.Mui-focused": {
                backgroundColor: (theme) =>
                  alpha(theme.palette.background.paper, 0.35),
                boxShadow: (theme) =>
                  `0 0 0 2px ${alpha(theme.palette.primary.main, 0.25)}`,
              },
              "& fieldset": { border: "none" },
            },
          }}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <Box
                display="flex"
                alignItems="center"
                mr={1}
                sx={{ color: "primary.main" }}
              >
                <Search fontSize="small" />
              </Box>
            ),
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <Box
            component="li"
            key={key}
            {...optionProps}
            sx={{
              p: 1.5,
              borderBottom: "1px solid",
              borderColor: "divider",
              "&:last-child": { borderBottom: 0 },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
              <LocationOn
                sx={{ mr: 2, color: "text.secondary", fontSize: 20 }}
              />
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {option.name}{" "}
                  {option.state && (
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.secondary"
                    >
                      ({option.state})
                    </Typography>
                  )}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    display: "block",
                    fontWeight: 500,
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                  }}
                >
                  {countryNames.of(option.country)}
                </Typography>
              </Box>
              <Typography
                variant="overline"
                sx={{ ml: 2, opacity: 0.5, fontWeight: 700 }}
              >
                {option.country}
              </Typography>
            </Box>
          </Box>
        );
      }}
    />
  );
};

export default CitySearch;
