import React, { useState, useEffect } from "react";
import {
    Grid,
    Button,
    Typography,
    Box,
    Paper,
    Card,
    CardContent,
    Link,
    Breadcrumbs,
    TextField,
    InputAdornment,

} from "@mui/material";
import { RiAddLargeLine } from "react-icons/ri";
import { LuRefreshCcw } from "react-icons/lu";
import { HiOutlineDotsVertical } from "react-icons/hi";
import WidgetCard from './Cards';
import WidgetDialog from './Dialogue';
import { CiSearch } from "react-icons/ci";

const Dashboard = () => {
    const [sectionData, setSectionData] = useState(() => {
        const savedData = localStorage.getItem('sectionData');
        return savedData ? JSON.parse(savedData) : [
            { id: "1", name: "section1", widgets: [] },
            { id: "2", name: "section2", widgets: [] },
            { id: "3", name: "section3", widgets: [] }
        ];
    });

    const [openAddWidget, setOpenAddWidget] = useState(false);
    const [openAddSection, setOpenAddSection] = useState(false);
    const [currentSectionId, setCurrentSectionId] = useState(null);
    const [newCardName, setNewCardName] = useState('');
    const [newCardContent, setNewCardContent] = useState('');
    const [newSectionName, setNewSectionName] = useState('');
    const [searchQuery, setSearchQuery] = useState('');


    useEffect(() => {
        localStorage.setItem('sectionData', JSON.stringify(sectionData));
    }, [sectionData]);

    const handleAddWidget = (sectionId) => {
        setCurrentSectionId(sectionId);
        setOpenAddWidget(true);
    };
    const handleSaveWidget = () => {

        if (!newCardName.trim() || !newCardContent.trim()) {
            alert("Both name and content are required to add a widget.");
            return;
        }
        const updatedSections = sectionData.map(section => {
            if (section.id === currentSectionId) {
                return {
                    ...section,
                    widgets: [...section.widgets, { name: newCardName, content: newCardContent }]
                };
            }
            return section;
        });
        setSectionData(updatedSections);
        setOpenAddWidget(false);
        setNewCardName('');
        setNewCardContent('');
    };

    const handleAddSection = () => {
        if (!newSectionName.trim()) {
            alert("add section name")
            return
        }
        const newSection = {
            id: (sectionData.length + 1).toString(),
            name: newSectionName,
            widgets: []
        };
        setSectionData([...sectionData, newSection]);
        setOpenAddSection(false);
        setNewSectionName('');
    };

    const handleDeleteWidget = (sectionId, widgetIndex) => {
        const updatedSections = sectionData.map(section => {
            if (section.id === sectionId) {
                const updatedWidgets = section.widgets.filter((_, index) => index !== widgetIndex);
                return { ...section, widgets: updatedWidgets };
            }
            return section;
        });
        setSectionData(updatedSections);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };
    const filteredWidgets = (section) => {
        return section.widgets.filter(widget =>
            widget.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: '80%', padding: '10px' }}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="#">
                        Home
                    </Link>
                    <Link underline="hover" color="inherit" href="#">
                        Dashboard
                    </Link>
                </Breadcrumbs>
                <TextField
                    onChange={handleSearchChange}
                    value={searchQuery}
                    sx={{
                        width: '350px',
                        '& .MuiInputBase-root': {
                            height: '35px',
                        },

                    }}
                    size="small"
                    variant="filled"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <CiSearch />
                            </InputAdornment>
                        ),
                    }}

                />
            </Box>
            <Box sx={{ background: '#E1EBEE' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px' }}>
                    <Box>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>CNAPP DASHBOARD</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: "10px" }}>
                        <Button sx={{ border: '1px solid black', color: 'black', background: 'white' }}
                            onClick={() => setOpenAddSection(true)}>
                            Add Section  &nbsp; <RiAddLargeLine />
                        </Button>
                        <Button sx={{ border: '1px solid black', color: 'black', background: 'white' }}>
                            <LuRefreshCcw />
                        </Button>
                        <Button sx={{ border: '1px solid black', color: 'black', background: 'white' }}>
                            <HiOutlineDotsVertical />
                        </Button>
                    </Box>
                </Box>
                <Box>
                    {sectionData.map((section) => (
                        <Box sx={{ padding: '15px' }} key={section.id}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{section.name}</Typography>
                            <Grid container spacing={4} sx={{ minHeight: '150px' }}>
                                {filteredWidgets(section).map((widget, index) => (
                                    <WidgetCard
                                        widget={widget}
                                        key={index}
                                        onDelete={() => handleDeleteWidget(section.id, index)}
                                    />
                                ))}
                                <Grid item md={3} xs={12} sm={6}>
                                    <Paper elevation={4} sx={{ minWidth: '200px' }}>
                                        <Card sx={{ minHeight: "120px", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <CardContent>
                                                <Button size="small" onClick={() => handleAddWidget(section.id)} sx={{ border: '1px solid black', color: 'black' }}>
                                                    <RiAddLargeLine /> &nbsp; Add Widget
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Box>
                    ))}
                    <WidgetDialog
                        required
                        open={openAddWidget}
                        onClose={() => setOpenAddWidget(false)}
                        title="Add New Widget"
                        name={newCardName}
                        content={newCardContent}
                        onNameChange={(e) => setNewCardName(e.target.value)}
                        onContentChange={(e) => setNewCardContent(e.target.value)}
                        onSave={handleSaveWidget}
                    />
                    <WidgetDialog
                        open={openAddSection}
                        onClose={() => setOpenAddSection(false)}
                        title="Add New Section"
                        name={newSectionName}
                        content=""
                        onNameChange={(e) => setNewSectionName(e.target.value)}
                        onContentChange={() => { }}
                        onSave={handleAddSection}
                    />
                </Box >
            </Box >
        </>
    )
}

export default Dashboard;
