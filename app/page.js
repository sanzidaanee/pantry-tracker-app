'use client'
import { useState, useEffect } from "react";
import { 
  getFirestore, 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  addDoc, 
  query, 
  deleteDoc, 
  setDoc, 
  onSnapshot, 
  querySnapshot } from "firebase/firestore";
  
import { firestore } from "./firebase";
import { Box, Button, Modal, Stack, TextField, Typography } from '@mui/material';


export default function Home() {
  const [pantry, setPantry] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemname] = useState('');

  const updatePantry = async () => {
    const snapshot = query (collection(firestore, 'pantry'))
    const docs = await getDocs(snapshot)
    const pantryList = []
    docs.forEach((doc) =>{
      pantryList.push ({
        name: doc.id, ...doc.data(),
      })

    }) 
    
    setPantry(pantryList)
  };


  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'pantry'), item)
    const docSnap = await getDoc(docRef)
  
    if (docSnap.exists()) {
      const {quantity} = docSnap.data()
      await setDoc(docRef, {quantity:quantity +1})

     } else {
        await setDoc(docRef, {quantity:1})
      }
    
    await updatePantry()
  }

const removeItem = async (item) => {
  const docRef = doc(collection(firestore, 'pantry'), item)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    const {quantity} = docSnap.data()
    if (quantity === 1) {
      await deleteDoc(docRef)

    } else {
      await setDoc(docRef, {quantity: 1})
    }
  }
  await updatePantry()
}

  useEffect(() => {
    updatePantry();
  }, []);

  const handleOpen = () => setOpen (true)
  const handleClose = () => setOpen (false)
  
  return (
    <Box
    width="50vw"
    height="80vh"
    display="flex"
    flexDirection="column"
    justifyContent={"center"}
    alignItems={"center"}
    gap={2}
    >
      <Modal
      open={open} onClose={handleClose}>
        <Box
        position= "absolute"
        top= "50%"
        left="50%"
        width ={400}
        bgcolor="white"
        border = "2px solid #000"
        boxshadow ={24}
        p={4}
        display ="flex"
        flexDirection="column"
        gap={3}
        sx = {{
          transform : 'translate (-50%, -50%)',
        }}
      >
        <Typography variant ="h6">Add Item</Typography>
        <Stack width="100%" direction="row" spacing ={2}>
          <TextField
          level="Item"
          variant = "outlined"
          fullWidth
          value ={itemName}
          onChange={(e) => { setItemname(e.target.value)

          }}
        />
        <Button 
         variant="outlined" 
         onClick={()=> {
          addItem (itemName)
          setItemname('')
          handleClose()
          

        }}
      > 
        Add
      </Button>
      </Stack>
    </Box>
  </Modal>

  <Button 
    variant="contained" onClick={() => {
    handleOpen()
  }}
>
    Add New Item

  </Button>
  <Box border="2px solid #333">
  <Box
    width= "800px" 
    height ="100px"
    bgcolor="#ADD8E6"
    display={"flex"}
    alignItems={"center"}
    justifyContent={"center"}
  >
    <Typography variant="h2" color={"#333"}>
      Pantry Items
    </Typography>
  
  </Box>

  <Stack width ="800px" height ="300px" spacing={2} overflow ="auto">
   {pantry.map(({name, quantity}) => (
    <Box 
      key= {name} 
      width={"100%"} 
      minHeight="150px" 
      display ="flex"
      alignItems={"center"}
      justifyContent={'space-between'}
      bgcolor={"#f0f0f0"}
      padding ={4}
    >
      <Typography variant ="h3" color ="#333" textAlign = "center">
       {name.charAt(0).toUpperCase() + name.slice(1)}
      </Typography>
      <Typography variant={'h3'} color={'#333'} textAlign={'center'}>
       {quantity}
      </Typography>
      <Button 
      variant="contained" 
      onClick={() => {
        removeItem(name)

      }}
      >
        Remove
    </Button>
  </Box>


  ))}
  </Stack>    
  
  </Box>
</Box>

)
  
}
  