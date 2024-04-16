import React, { lazy, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import MUIDataTable from "mui-datatables";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Loader from './Loader';

const Cities = () => {

    const [cities, setCities] = useState([]);
    const [page, setPage]= useState(20);
    const [loading, setLoading]= useState(true);

    const columns = [
        {
            name: "ascii_name",
            label: "City",
            options: {
                customBodyRender: (value) => <Link to={`./${value}`} className='hover:border-b-[1px]'>{value}</Link>,
            }
        },
        {
            name: "cou_name_en",
            label: "Country",
        },
        {
            label: "Country Code",
            name: "country_code",
        },
        {
            lable: "Population",
            name: "population",
        },
        {
            label: "timezone",
            name: "timezone",
        },
    ];

    const options = {
        filterType: 'option',
        selectableRows: false,
        elevation: 0,
        rowsPerPage: Infinity,
        pagination: false,
        download: false,
        print: false,
        viewColumns: false,
    };

    // getting cities
    useEffect(() => {

        const fetchData = async () => {
            const res = await fetch(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=${page}`)

            const data = await res.json();
            setCities(data);
            setLoading(false);
        }

        fetchData();
    }, [page])

    const getMuiTheme = () => createTheme({
        typography: {
            fontFamily: "Poppins",
        },
        palette: {
            background: {
                paper: "#1e293b",
                default: "#0f172a",
            },
            mode: "dark"
        },
        components: {
            MuiTableCell: {
                    styleOverrides: {
                        head: {
                            padding: "1rem",
                        },
                        body: {
                            padding: "1rem",
                            color: "#e2e8fO",
                        },
                        
                    }
            }
        }
    })

    // infinite scroll
    const handleScroll= () => {
        if(window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
            setLoading(true);
            setPage(prev => prev + 10);
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)

        return () => window.removeEventListener("scroll", handleScroll);
    }, [])

    return (
        <div className='w-10/12'>
            <ThemeProvider theme={getMuiTheme()}>
                <MUIDataTable
                    title={"Cities"}
                    data={cities.results}
                    columns={columns}
                    options={options}
                />
            </ThemeProvider>
            {loading && <Loader/>}
        </div>
    )
}

export default Cities