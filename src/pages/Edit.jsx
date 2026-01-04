import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from "axios"
import { toast } from 'react-toastify';
import { baseurl } from '../api';
export default function Edit() {
    //const params=useParams()
    //console.log(params.id)
    const {id}=useParams()
    const navigate=useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        amount: "",
        category: ""

    })
    const[isLoading,setIsLoading]=useState(false)
    
      const fetchSingleExpense=async()=>{
        try {
          const res=await axios.get(`${baseurl}/api/expense/view/${id}`)
          //console.log(res.data)
          if (res.data.success) {
                setFormData(res.data.expenseDetails)
                toast.success(res.message)
            } else {
                toast.error(res.message)
                
            }
        } catch (error) {
          console.log(error)
          
        }
      }
      useEffect(()=>{
        fetchSingleExpense()
      },[])
    
    const handleSubmit=async()=>{
        setIsLoading(true);
        //console.log(formData);
        try {
            const res=await axios.put(`${baseurl}/api/expense/edit/${id}`,formData)
              if(res.data.success){
                toast.success(res.data.message)
                setTimeout(()=>{navigate("/")},2000)
              }else{
                toast.error(res.data.message)
              }
            
            //console.log(res)
            
        } catch (error) {
            console.log(error)
        
        }
        finally{
            setTimeout(()=>{setIsLoading(false)},2000)
        }

    }
    return (
        <Box>
            <Box sx={{ textAlign: "center" }}>
                <Typography variant="h4">Add Expense list</Typography>
            </Box>
            <Box sx={{ backgroundColor: "pink", p: 4, display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Paper sx={{ width: "70%", p: 3 }}>
                    <TextField value={formData.title}
                    fullWidth onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        label="Enter expense title" placeholder="Enter title" sx={{ mb: 2 }} />
                    <TextField  value={formData.amount}
                    fullWidth onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        label="Enter expense amount" placeholder="Enter amount" type="number" sx={{ mb: 2 }} />
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Select expense category</InputLabel>
                        <Select 
                             value={formData.category}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            //value={age}
                            onChange={(e)=>setFormData({...formData,category:e.target.value})}
                            label="Select expense category"
                        //onChange={handleChange}
                        >
                            <MenuItem value="Transport">Transport</MenuItem>
                            <MenuItem value="Food">Food</MenuItem>
                            <MenuItem value="Travel">Travel</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                        </Select>
                    </FormControl>
                    <Button onClick={handleSubmit} variant="contained" fullWidth
                    loading={isLoading}>Submit</Button>
                    <Button component={Link} to={"/"} sx={{ mb: 1 }} variant="outlined" color="secondary" fullWidth >View entries</Button>
                </Paper>
            </Box>
        </Box>
    )
}

