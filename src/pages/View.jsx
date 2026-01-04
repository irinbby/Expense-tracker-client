import { Box, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import ExpenseTable from '../components/Table'
import FloatingappButton from '../components/Floatingappbutton'
import { useState } from 'react'
import axios from 'axios'

export default function View() {
    const[allExpenses,setAllExpenses]=useState([])
    const fetchAllExpenses=async()=>{
        try {
            const res=await axios.get(`http://localhost:7000/api/expense/view-all`)
            //console.log(res.data)
            if (res.data.success) {
                setAllExpenses(res.data.expenses)
            }
        } catch (error) {
            console.log(error)
            
        }
    }
    //useEffect syntax:arrow function,dependency
    useEffect(()=>{
        fetchAllExpenses();
    },[])
    //console.log(allExpenses)
    return (
        <Box>
            <Box sx={{ textAlign: "center" }}>
                <Typography variant="h4">Expense list</Typography>
            </Box>
            <Box sx={{ p: 2 }}>
            <ExpenseTable allExpenses={allExpenses}fetchAllExpenses={fetchAllExpenses}/>
            </Box>
            <FloatingappButton />
            </Box>
    )
}
