import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Menu, MenuItem, IconButton, Typography, Avatar } from "@mui/material";

import tajFlag from "/src/assets/tajikistan.png";
import russFlag from "/src/assets/russia.png";
import engFlag from "/src/assets/united-kingdom.png";
import { useDispatch } from "react-redux";

import "./LanguageSelect.css";
import { GetBanner, GetChooseUs, GetCourse, GetTextReview, GetVideoReview } from "../../Api/bannerApi";

const LanguageSelect = () => {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);

  const languages = [
    { code: "ru", name: "Русский", nick: "Ru", flag: russFlag },
    { code: "tj", name: "Тоҷикӣ", nick: "Tj", flag: tajFlag },
    { code: "en", name: "English", nick: "En", flag: engFlag },
  ];
  
  // Находим текущий флаг на основе текущего языка i18n
  const getCurrentFlag = () => {
    const currentLang = languages.find(lang => lang.code === i18n.language);
    return currentLang ? currentLang.flag : russFlag;
  };
  
  // Инициализируем состояние флага на основе текущего языка
  const [flag, setFlag] = useState(getCurrentFlag());
  
  // Обновляем флаг при изменении языка i18n
  useEffect(() => {
    setFlag(getCurrentFlag());
  }, [i18n.language]);

  const handleChangeLanguage = (lang) => {
    i18n.changeLanguage(lang.code);
    localStorage.setItem('selectedLanguage', lang.code); // Сохраняем выбор в localStorage
    setFlag(lang.flag);
    setAnchorEl(null);
    dispatch(GetBanner(lang.nick));
    dispatch(GetChooseUs(lang.nick));
    dispatch(GetCourse(lang.nick));
    dispatch(GetVideoReview(lang.nick));
    dispatch(GetTextReview(lang.nick));
  };
  
  // При первом рендере, проверяем наличие сохраненного языка
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      const langObj = languages.find(lang => lang.code === savedLanguage);
      if (langObj && i18n.language !== savedLanguage) {
        i18n.changeLanguage(savedLanguage);
        dispatch(GetBanner(langObj.nick));
        dispatch(GetChooseUs(langObj.nick));
        dispatch(GetCourse(langObj.nick));
        dispatch(GetVideoReview(langObj.nick));
        dispatch(GetTextReview(langObj.nick));
      }
    }
  }, []);

  return (
    <div className="language-select-container backdrop-blur-2xl rounded-xl ">
      <IconButton
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          padding: "8px 12px",
          borderRadius: "8px",
          backdropFilter: "blur(16px)",
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.9)" },
          transition: "all 0.3s ease",
        }}
      >
        <Avatar src={flag} sx={{ width: 24, height: 24 }} />
        <Typography fontSize={14} fontWeight={500}>
          {languages.find((lang) => lang.flag === flag)?.nick}
        </Typography>
        <ExpandMoreIcon fontSize="small" />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        sx={{ 
          mt: 1,
          "& .MuiPaper-root": {
            backdropFilter: "blur(16px)",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            borderRadius: "8px",
            boxShadow: "0px 8px 16px rgba(0,0,0,0.1)",
          }
        }}
      >
        {languages.map((lang) => (
          <MenuItem 
            key={lang.code} 
            onClick={() => handleChangeLanguage(lang)}
            sx={{
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              }
            }}
          >
            <Avatar src={lang.flag} sx={{ width: 20, height: 20, mr: 1 }} />
            {lang.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default LanguageSelect;