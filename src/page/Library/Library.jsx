// import { useState, useEffect } from "react";
// import { 
//   Container, 
//   Typography, 
//   Grid, 
//   Card, 
//   CardContent, 
//   CardActions, 
//   Button, 
//   TextField, 
//   InputAdornment, 
//   Tabs, 
//   Tab, 
//   Box, 
//   Chip,
//   Avatar,
//   Divider,
//   IconButton,
//   Menu,
//   MenuItem,
//   Tooltip
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import FilterListIcon from "@mui/icons-material/FilterList";
// import GetAppIcon from "@mui/icons-material/GetApp";
// import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
// import DescriptionIcon from "@mui/icons-material/Description";
// import TableChartIcon from "@mui/icons-material/TableChart";
// import ImageIcon from "@mui/icons-material/Image";
// import VideocamIcon from "@mui/icons-material/Videocam";
// import AudioFileIcon from "@mui/icons-material/AudioFile";
// import ArchiveIcon from "@mui/icons-material/Archive";
// import CodeIcon from "@mui/icons-material/Code";
// import FolderIcon from "@mui/icons-material/Folder";
// import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
// import SortIcon from "@mui/icons-material/Sort";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import { useTranslation } from "react-i18next";

// // Функция для определения иконки файла по типу
// const getFileIcon = (fileType) => {
//   switch (fileType.toLowerCase()) {
//     case "pdf":
//       return <PictureAsPdfIcon sx={{ color: "#f44336" }} />;
//     case "doc":
//     case "docx":
//       return <DescriptionIcon sx={{ color: "#2196f3" }} />;
//     case "xls":
//     case "xlsx":
//       return <TableChartIcon sx={{ color: "#4caf50" }} />;
//     case "jpg":
//     case "jpeg":
//     case "png":
//       return <ImageIcon sx={{ color: "#ff9800" }} />;
//     case "mp4":
//     case "avi":
//     case "mov":
//       return <VideocamIcon sx={{ color: "#9c27b0" }} />;
//     case "mp3":
//     case "wav":
//       return <AudioFileIcon sx={{ color: "#e91e63" }} />;
//     case "zip":
//     case "rar":
//       return <ArchiveIcon sx={{ color: "#795548" }} />;
//     case "html":
//     case "css":
//     case "js":
//       return <CodeIcon sx={{ color: "#607d8b" }} />;
//     default:
//       return <FolderIcon sx={{ color: "#ffc107" }} />;
//   }
// };

// // Тестовые данные файлов
// const demoFiles = [
//   { 
//     id: 1, 
//     title: "Учебное пособие по математике", 
//     description: "Полное учебное пособие для студентов первого курса",
//     type: "pdf", 
//     size: "12.5 MB", 
//     date: "2023-11-15", 
//     category: "Учебники", 
//     downloads: 325,
//     language: "ru"
//   },
//   { 
//     id: 2, 
//     title: "Дастурамал оид ба забони тоҷикӣ", 
//     description: "Дастурамали пурра барои донишҷӯён",
//     type: "docx", 
//     size: "2.8 MB", 
//     date: "2023-10-20", 
//     category: "Дастурҳо", 
//     downloads: 178,
//     language: "tj" 
//   },
//   { 
//     id: 3, 
//     title: "Financial Analysis Template", 
//     description: "A comprehensive Excel template for financial analysis",
//     type: "xlsx", 
//     size: "4.2 MB", 
//     date: "2023-09-05", 
//     category: "Templates", 
//     downloads: 215,
//     language: "en" 
//   },
//   { 
//     id: 4, 
//     title: "Презентация по истории Таджикистана", 
//     description: "Исторические события и важные даты",
//     type: "pdf", 
//     size: "8.7 MB", 
//     date: "2023-12-01", 
//     category: "Презентации", 
//     downloads: 142,
//     language: "ru" 
//   },
//   { 
//     id: 5, 
//     title: "Барномаи таълимӣ", 
//     description: "Барномаи таълимии фанни математика",
//     type: "doc", 
//     size: "1.5 MB", 
//     date: "2023-08-18", 
//     category: "Барномаҳо", 
//     downloads: 98,
//     language: "tj" 
//   },
//   { 
//     id: 6, 
//     title: "Programming Guide", 
//     description: "Introduction to programming concepts and practices",
//     type: "pdf", 
//     size: "5.3 MB", 
//     date: "2023-11-28", 
//     category: "Guides", 
//     downloads: 276,
//     language: "en" 
//   },
//   { 
//     id: 7, 
//     title: "Словарь технических терминов", 
//     description: "Полный словарь технических терминов и определений",
//     type: "xlsx", 
//     size: "3.8 MB", 
//     date: "2023-07-12", 
//     category: "Справочники", 
//     downloads: 125,
//     language: "ru" 
//   },
//   { 
//     id: 8, 
//     title: "Луғати истилоҳоти тиббӣ", 
//     description: "Истилоҳоти тиббӣ бо шарҳи муфассал",
//     type: "pdf", 
//     size: "6.9 MB", 
//     date: "2023-10-05", 
//     category: "Луғатҳо", 
//     downloads: 156,
//     language: "tj" 
//   },
//   { 
//     id: 9, 
//     title: "Research Methods", 
//     description: "A comprehensive guide to research methods",
//     type: "docx", 
//     size: "4.1 MB", 
//     date: "2023-09-22", 
//     category: "Academic", 
//     downloads: 189,
//     language: "en" 
//   },
//   { 
//     id: 10, 
//     title: "Набор графических материалов", 
//     description: "Изображения и диаграммы для презентаций",
//     type: "zip", 
//     size: "23.5 MB", 
//     date: "2023-11-10", 
//     category: "Графика", 
//     downloads: 78,
//     language: "ru" 
//   },
//   { 
//     id: 11, 
//     title: "Маводи видеоӣ", 
//     description: "Видеоҳои таълимӣ барои донишҷӯён",
//     type: "mp4", 
//     size: "85.2 MB", 
//     date: "2023-12-05", 
//     category: "Видео", 
//     downloads: 112,
//     language: "tj" 
//   },
//   { 
//     id: 12, 
//     title: "Audio Lectures", 
//     description: "Audio recordings of lectures on various topics",
//     type: "mp3", 
//     size: "45.7 MB", 
//     date: "2023-08-30", 
//     category: "Audio", 
//     downloads: 92,
//     language: "en" 
//   }
// ];

// // Компонент страницы библиотеки
// const Library = () => {
//   const { t, i18n } = useTranslation();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [tabValue, setTabValue] = useState(0);
//   const [anchorElFilter, setAnchorElFilter] = useState(null);
//   const [anchorElSort, setAnchorElSort] = useState(null);
//   const [filteredFiles, setFilteredFiles] = useState(demoFiles);
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [selectedFileType, setSelectedFileType] = useState("all");
//   const [sortOption, setSortOption] = useState("date-desc");

//   // Преобразование категорий файлов в зависимости от языка
//   const getCategoryByLanguage = (category, language) => {
//     const categoryMap = {
//       "ru": {
//         "Учебники": "Учебники",
//         "Дастурҳо": "Инструкции",
//         "Templates": "Шаблоны",
//         "Презентации": "Презентации",
//         "Барномаҳо": "Программы",
//         "Guides": "Руководства",
//         "Справочники": "Справочники",
//         "Луғатҳо": "Словари",
//         "Academic": "Академические",
//         "Графика": "Графика",
//         "Видео": "Видео",
//         "Audio": "Аудио"
//       },
//       "tj": {
//         "Учебники": "Китобҳои дарсӣ",
//         "Дастурҳо": "Дастурҳо",
//         "Templates": "Намунаҳо",
//         "Презентации": "Презентатсияҳо",
//         "Барномаҳо": "Барномаҳо",
//         "Guides": "Дастурҳо",
//         "Справочники": "Маълумотномаҳо",
//         "Луғатҳо": "Луғатҳо",
//         "Academic": "Академикӣ",
//         "Графика": "Графика",
//         "Видео": "Видео",
//         "Audio": "Аудио"
//       },
//       "en": {
//         "Учебники": "Textbooks",
//         "Дастурҳо": "Manuals",
//         "Templates": "Templates",
//         "Презентации": "Presentations",
//         "Барномаҳо": "Programs",
//         "Guides": "Guides",
//         "Справочники": "References",
//         "Луғатҳо": "Dictionaries",
//         "Academic": "Academic",
//         "Графика": "Graphics",
//         "Видео": "Video",
//         "Audio": "Audio"
//       }
//     };
    
//     return categoryMap[language]?.[category] || category;
//   };

//   // Обработка изменения вкладок
//   const handleTabChange = (event, newValue) => {
//     setTabValue(newValue);
//   };

//   // Обработка поиска
//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   // Обработка фильтрации
//   const handleFilterClick = (event) => {
//     setAnchorElFilter(event.currentTarget);
//   };

//   const handleFilterClose = () => {
//     setAnchorElFilter(null);
//   };

//   const handleCategoryFilter = (category) => {
//     setSelectedCategory(category);
//     handleFilterClose();
//   };

//   const handleFileTypeFilter = (fileType) => {
//     setSelectedFileType(fileType);
//     handleFilterClose();
//   };

//   // Обработка сортировки
//   const handleSortClick = (event) => {
//     setAnchorElSort(event.currentTarget);
//   };

//   const handleSortClose = () => {
//     setAnchorElSort(null);
//   };

//   const handleSortOption = (option) => {
//     setSortOption(option);
//     handleSortClose();
//   };

//   // Эффект для фильтрации и сортировки файлов
//   useEffect(() => {
//     let result = [...demoFiles];
    
//     // Фильтрация по поиску
//     if (searchTerm.trim() !== "") {
//       result = result.filter(file => 
//         file.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         file.description.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
    
//     // Фильтрация по вкладкам (языку)
//     if (tabValue === 0) {
//       // Все языки - ничего не фильтруем
//     } else if (tabValue === 1) {
//       result = result.filter(file => file.language === "ru");
//     } else if (tabValue === 2) {
//       result = result.filter(file => file.language === "tj");
//     } else if (tabValue === 3) {
//       result = result.filter(file => file.language === "en");
//     }
    
//     // Фильтрация по категории
//     if (selectedCategory !== "all") {
//       result = result.filter(file => file.category === selectedCategory);
//     }
    
//     // Фильтрация по типу файла
//     if (selectedFileType !== "all") {
//       result = result.filter(file => file.type === selectedFileType);
//     }
    
//     // Сортировка
//     result.sort((a, b) => {
//       switch (sortOption) {
//         case "title-asc":
//           return a.title.localeCompare(b.title);
//         case "title-desc":
//           return b.title.localeCompare(a.title);
//         case "date-asc":
//           return new Date(a.date) - new Date(b.date);
//         case "date-desc":
//           return new Date(b.date) - new Date(a.date);
//         case "downloads-asc":
//           return a.downloads - b.downloads;
//         case "downloads-desc":
//           return b.downloads - a.downloads;
//         case "size-asc":
//           return parseFloat(a.size) - parseFloat(b.size);
//         case "size-desc":
//           return parseFloat(b.size) - parseFloat(a.size);
//         default:
//           return new Date(b.date) - new Date(a.date);
//       }
//     });
    
//     setFilteredFiles(result);
//   }, [searchTerm, tabValue, selectedCategory, selectedFileType, sortOption]);

//   // Форматирование даты
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return new Intl.DateTimeFormat(i18n.language === "en" ? "en-US" : i18n.language === "tj" ? "tg-TJ" : "ru-RU", {
//       year: "numeric",
//       month: "long",
//       day: "numeric"
//     }).format(date);
//   };

//   // Эмуляция скачивания файла
//   const handleDownload = (file) => {
//     alert(t("downloadStarted", { fileName: file.title }));
//   };

//   // Уникальные категории для фильтра
//   const uniqueCategories = Array.from(new Set(demoFiles.map(file => file.category)));
  
//   // Уникальные типы файлов для фильтра
//   const uniqueFileTypes = Array.from(new Set(demoFiles.map(file => file.type)));

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       <Box sx={{ mb: 4, display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: { md: "center" }, justifyContent: "space-between", gap: 2 }}>
//         <Typography variant="h4" component="h1" fontWeight="bold" sx={{ mb: { xs: 2, md: 0 } }}>
//           {t("library")}
//         </Typography>
        
//         <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
//           <TextField
//             placeholder={t("search")}
//             variant="outlined"
//             size="small"
//             value={searchTerm}
//             onChange={handleSearch}
//             sx={{ 
//               minWidth: 220,
//               bgcolor: "background.paper",
//               borderRadius: 1,
//               "& .MuiOutlinedInput-root": {
//                 borderRadius: 1,
//                 boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)"
//               }
//             }}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon />
//                 </InputAdornment>
//               ),
//             }}
//           />
          
//           <Box>
//             <Tooltip title={t("filter")}>
//               <IconButton 
//                 onClick={handleFilterClick}
//                 sx={{ 
//                   bgcolor: "background.paper", 
//                   boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
//                   "&:hover": { bgcolor: "background.paper", opacity: 0.8 }
//                 }}
//               >
//                 <FilterListIcon />
//               </IconButton>
//             </Tooltip>
//             <Menu
//               anchorEl={anchorElFilter}
//               open={Boolean(anchorElFilter)}
//               onClose={handleFilterClose}
//               PaperProps={{
//                 sx: { 
//                   width: 240,
//                   maxHeight: 500,
//                   p: 1,
//                   boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.15)"
//                 }
//               }}
//             >
//               <Typography variant="subtitle2" sx={{ px: 2, py: 1, fontWeight: "bold" }}>
//                 {t("categories")}
//               </Typography>
//               <MenuItem onClick={() => handleCategoryFilter("all")} selected={selectedCategory === "all"}>
//                 {t("allCategories")}
//               </MenuItem>
//               {uniqueCategories.map((category) => (
//                 <MenuItem 
//                   key={category} 
//                   onClick={() => handleCategoryFilter(category)}
//                   selected={selectedCategory === category}
//                 >
//                   {getCategoryByLanguage(category, i18n.language)}
//                 </MenuItem>
//               ))}
              
//               <Divider sx={{ my: 1 }} />
              
//               <Typography variant="subtitle2" sx={{ px: 2, py: 1, fontWeight: "bold" }}>
//                 {t("fileTypes")}
//               </Typography>
//               <MenuItem onClick={() => handleFileTypeFilter("all")} selected={selectedFileType === "all"}>
//                 {t("allFileTypes")}
//               </MenuItem>
//               {uniqueFileTypes.map((fileType) => (
//                 <MenuItem 
//                   key={fileType} 
//                   onClick={() => handleFileTypeFilter(fileType)}
//                   selected={selectedFileType === fileType}
//                 >
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                     {getFileIcon(fileType)}
//                     {fileType.toUpperCase()}
//                   </Box>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>
          
//           <Box>
//             <Tooltip title={t("sort")}>
//               <IconButton 
//                 onClick={handleSortClick}
//                 sx={{ 
//                   bgcolor: "background.paper", 
//                   boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
//                   "&:hover": { bgcolor: "background.paper", opacity: 0.8 }
//                 }}
//               >
//                 <SortIcon />
//               </IconButton>
//             </Tooltip>
//             <Menu
//               anchorEl={anchorElSort}
//               open={Boolean(anchorElSort)}
//               onClose={handleSortClose}
//               PaperProps={{
//                 sx: { width: 220, p: 1, boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.15)" }
//               }}
//             >
//               <Typography variant="subtitle2" sx={{ px: 2, py: 1, fontWeight: "bold" }}>
//                 {t("sortBy")}
//               </Typography>
//               <MenuItem onClick={() => handleSortOption("date-desc")} selected={sortOption === "date-desc"}>
//                 {t("newestFirst")}
//               </MenuItem>
//               <MenuItem onClick={() => handleSortOption("date-asc")} selected={sortOption === "date-asc"}>
//                 {t("oldestFirst")}
//               </MenuItem>
//               <MenuItem onClick={() => handleSortOption("title-asc")} selected={sortOption === "title-asc"}>
//                 {t("titleAZ")}
//               </MenuItem>
//               <MenuItem onClick={() => handleSortOption("title-desc")} selected={sortOption === "title-desc"}>
//                 {t("titleZA")}
//               </MenuItem>
//               <MenuItem onClick={() => handleSortOption("downloads-desc")} selected={sortOption === "downloads-desc"}>
//                 {t("mostDownloaded")}
//               </MenuItem>
//               <MenuItem onClick={() => handleSortOption("size-desc")} selected={sortOption === "size-desc"}>
//                 {t("largestSize")}
//               </MenuItem>
//               <MenuItem onClick={() => handleSortOption("size-asc")} selected={sortOption === "size-asc"}>
//                 {t("smallestSize")}
//               </MenuItem>
//             </Menu>
//           </Box>
//         </Box>
//       </Box>
      
//       <Box sx={{ mb: 4 }}>
//         <Tabs 
//           value={tabValue} 
//           onChange={handleTabChange}
//           textColor="primary"
//           indicatorColor="primary"
//           sx={{
//             "& .MuiTabs-flexContainer": {
//               borderBottom: "1px solid rgba(0, 0, 0, 0.1)"
//             },
//             "& .MuiTab-root": {
//               fontWeight: "medium",
//               textTransform: "none",
//               minHeight: 48
//             }
//           }}
//         >
//           <Tab label={t("allLanguages")} />
//           <Tab label={t("russian")} />
//           <Tab label={t("tajik")} />
//           <Tab label={t("english")} />
//         </Tabs>
//       </Box>
      
//       {filteredFiles.length === 0 ? (
//         <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", py: 8 }}>
//           <FolderIcon sx={{ fontSize: 80, color: "text.secondary", opacity: 0.5, mb: 2 }} />
//           <Typography variant="h6" color="text.secondary">
//             {t("noFilesFound")}
//           </Typography>
//           <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
//             {t("tryDifferentSearch")}
//           </Typography>
//         </Box>
//       ) : (
//         <Grid container spacing={3}>
//           {filteredFiles.map((file) => (
//             <Grid item xs={12} sm={6} md={4} key={file.id}>
//               <Card 
//                 sx={{ 
//                   height: "100%", 
//                   display: "flex", 
//                   flexDirection: "column",
//                   borderRadius: 2,
//                   boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.08)",
//                   transition: "transform 0.2s, box-shadow 0.2s",
//                   "&:hover": {
//                     transform: "translateY(-4px)",
//                     boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.12)"
//                   }
//                 }}
//               >
//                 <CardContent sx={{ flexGrow: 1, pb: 0 }}>
//                   <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2, gap: 1 }}>
//                     <Avatar
//                       variant="rounded"
//                       sx={{ 
//                         bgcolor: "background.default", 
//                         width: 48, 
//                         height: 48,
//                         boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.08)"
//                       }}
//                     >
//                       {getFileIcon(file.type)}
//                     </Avatar>
//                     <Box sx={{ ml: 1, width: "calc(100% - 64px)" }}>
//                       <Typography variant="h6" component="h2" gutterBottom noWrap>
//                         {file.title}
//                       </Typography>
//                       <Chip 
//                         label={file.type.toUpperCase()} 
//                         size="small" 
//                         sx={{ fontSize: "0.7rem", height: 20 }}
//                       />
//                       <Typography variant="body2" color="text.secondary" sx={{ mb: 1, mt: 1 }} noWrap>
//                         {formatDate(file.date)}
//                       </Typography>
//                     </Box>
//                   </Box>
                  
//                   <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
//                     {file.description}
//                   </Typography>
                  
//                   <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
//                     <Chip 
//                       label={getCategoryByLanguage(file.category, i18n.language)} 
//                       size="small" 
//                       sx={{ 
//                         bgcolor: "primary.light", 
//                         color: "white",
//                         fontSize: "0.7rem",
//                         height: 22
//                       }}
//                     />
//                     <Typography variant="body2" color="text.secondary">
//                       {file.size}
//                     </Typography>
//                   </Box>
//                 </CardContent>
                
//                 <CardActions sx={{ p: 2, pt: 0 }}>
//                   <Box sx={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
//                     <Button 
//                       variant="outlined" 
//                       startIcon={<VisibilityIcon />}
//                       size="small"
//                       sx={{ textTransform: "none" }}
//                     >
//                       {t("preview")}
//                     </Button>
//                     <Button 
//                       variant="contained" 
//                       color="primary" 
//                       startIcon={<CloudDownloadIcon />}
//                       size="small"
//                       onClick={() => handleDownload(file)}
//                       sx={{ textTransform: "none" }}
//                     >
//                       {t("download")}
//                     </Button>
//                   </Box>
//                 </CardActions>
                
//                 <Box 
//                   sx={{ 
//                     display: "flex", 
//                     alignItems: "center", 
//                     justifyContent: "center",
//                     p: 1,
//                     borderTop: "1px solid rgba(0,0,0,0.08)",
//                     bgcolor: "background.default"
//                   }}
//                 >
//                   <GetAppIcon fontSize="small" sx={{ color: "text.secondary", mr: 0.5 }} />
//                   <Typography variant="body2" color="text.secondary">
//                     {t("downloadCount", { count: file.downloads })}
//                   </Typography>
//                 </Box>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       )}
//     </Container>
//   );
// };

// export default Library;






import React, { useEffect, useState } from 'react';
import { BookOpen, Construction, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Library = () => {
  const [dots, setDots] = useState('.');
  const [toolAngle, setToolAngle] = useState(0);
  const { t } = useTranslation();

  // Анимация для точек загрузки
  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots((prevDots) => {
        if (prevDots.length >= 3) return '.';
        return prevDots + '.';
      });
    }, 500);

    return () => clearInterval(dotsInterval);
  }, []);

  // Анимация инструментов
  useEffect(() => {
    const toolInterval = setInterval(() => {
      setToolAngle((prevAngle) => (prevAngle + 15) % 360);
    }, 300);

    return () => clearInterval(toolInterval);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full mx-4 p-8 bg-white rounded-lg shadow-lg text-center">
        <div className="relative mb-8 mx-auto w-32 h-32 flex items-center justify-center">
          {/* Иконка книги */}
          <BookOpen size={64} className="text-blue-600 absolute z-10" />
          
          {/* Анимированные инструменты */}
          <Construction 
            size={48} 
            className="text-yellow-500 absolute" 
            style={{ 
              transform: `rotate(${toolAngle}deg) translateX(30px)`,
              transition: 'transform 0.3s ease'
            }} 
          />
        </div>

        <h1 className="text-3xl font-bold text-blue-800 mb-4">
          {t('library.title', 'Китобхона дар коркард')}
        </h1>
        
        <p className="text-gray-600 text-lg mb-6">
          {t('library.description', 'Дар айни ҳол китобхонаи мо коркард карда шудааст. Барои шумо хизматҳои нави хубтаринро тайёр мекунем.')}
        </p>
        
        <div className="flex items-center justify-center space-x-2 text-yellow-600 mb-8">
          <Clock className="w-6 h-6" />
          <p className="text-xl font-semibold animate-pulse">
            {t('library.openingSoon', 'Рӯзҳои наздик кушода мешавад')}{dots}
          </p>
        </div>
        
        <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
          <div 
            className="bg-blue-500 h-full rounded-full"
            style={{ 
              width: '70%',
              animation: 'pulse 2s infinite' 
            }}
          ></div>
        </div>
        
        <p className="mt-3 text-gray-500">{t('library.progress', '70% иҷро шудааст')}</p>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
};

export default Library;