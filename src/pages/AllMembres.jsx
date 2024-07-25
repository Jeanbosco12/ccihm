import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Box, Typography, useTheme } from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from '../theme';
import Header from "../component/Header";

export const AllMembre = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await axios.get('http://localhost:8080/membres')
                .then(response  => {
                    setData(response.data);
                    console.log(data);
                })
                .catch(err  => {
                    console.log(err)
                })
                
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const columns = [
        { field: "id", headerName: "ID" },
        {
            field: "nom",
            headerName: "Nom",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "prenom",
            headerName: "Prénoms",
            flex: 1,
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
        },
        {
            field: "adresse",
            headerName: "Adresse",
            flex: 1,
        },
        {
            field: "dateadhesion",
            headerName: "Adhesion",
            flex: 1,
        },
    ];

    return (

        <Box m="20px">
            <Header title="INVOICES" subtitle="List of Invoice Balances" />
            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                      border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                      borderBottom: "none",
                    },
                    "& .name-column--cell": {
                      color: colors.greenAccent[300],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                      backgroundColor: colors.blueAccent[700],
                      borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                      backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                      borderTop: "none",
                      backgroundColor: colors.blueAccent[700],
                    },
                    "& .MuiCheckbox-root": {
                      color: `${colors.greenAccent[200]} !important`,
                    },
                  }}
            >
                <DataGrid checkboxSelection rows={data} columns={columns} />
            </Box>
        </Box>
    );
};

export default AllMembre;