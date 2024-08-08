import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import CategoryIcon from '@mui/icons-material/Category';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import Dashboard from './Dashboard/Dashboard';
import { Outlet, useNavigate } from 'react-router-dom';
const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function Sidebar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  
  const navigate = useNavigate();
  const handledashboard = ()=>{
    navigate("/dashboard")
  }

  const handelUser = ()=>{
    navigate('/user')
  }

  const handelRole =()=>{
    navigate('/role')
  }

  const handleCategory = ()=>{
    navigate('/category')
  }
  const handleSub =()=>{
    navigate('/Subcategory')
  }

  const handleRetailer =() =>{
    navigate('retailer')
  }
  const handleOffer =()=>{
    navigate('offer')
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }} style={{marginTop:'35px'}}>
      <CssBaseline />
      <AppBar position="fixed" open={open} style={{backgroundColor:'black', }} >
        <Toolbar>
          <IconButton
            color="white"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr:2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div"
          sx={{flexGrow: 1,
          ml:130}}>
           Welcome:User
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor:'#53616E',
            color:'white'
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
        <img src='https://i.pinimg.com/736x/14/34/c0/1434c01245c6b30ba3d384b57a6abfd6.jpg'
        style={{height:'48px',width:'48px',borderRadius: '50%',marginRight:'50px'}}>
                </img>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List onClick={handledashboard} >
          {['Dashboard'  ].map((text, index) => (
            <ListItem key={text} disablePadding  onClick={handledashboard}>
              <ListItemButton
              
              >
                <ListItemIcon style={{color:'white'}}>
                  {index % 2 === 0 ? <DashboardCustomizeIcon /> : <DashboardCustomizeIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <List>
          {['Users' ].map((text, index) => (
            <ListItem key={text} disablePadding  onClick={handelUser}>
              <ListItemButton>
                <ListItemIcon  style={{color:'white'}}>
                  {index % 2 === 0 ? <PeopleOutlineIcon/> : <PeopleOutlineIcon/>}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <List>
          {['Role' ].map((text, index) => (
            <ListItem key={text} disablePadding onClick={handelRole}>
              <ListItemButton>
                <ListItemIcon  style={{color:'white'}}>
                  {index % 2 === 0 ? <PersonOutlineIcon /> : <PersonOutlineIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <List>
          {['Category' ].map((text, index) => (
            <ListItem key={text} disablePadding onClick={handleCategory}>
              <ListItemButton>
                <ListItemIcon  style={{color:'white'}}>
                  {index % 2 === 0 ? < CategoryIcon /> : <CategoryIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <List>
          {['Subcategory' ].map((text, index) => (
            <ListItem key={text} disablePadding onClick={handleSub}>
              <ListItemButton>
                <ListItemIcon  style={{color:'white'}}>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <List>
          {['Retailer' ].map((text, index) => (
            <ListItem key={text} disablePadding onClick={handleRetailer}>
              <ListItemButton>
                <ListItemIcon  style={{color:'white'}}>
                  {index % 2 === 0 ? < HomeWorkIcon /> : < HomeWorkIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <List>
          {['Offers' ].map((text, index) => (
            <ListItem key={text} disablePadding onClick={handleOffer}>
              <ListItemButton>
                <ListItemIcon  style={{color:'white'}}>
                  {index % 2 === 0 ? <LocalOfferIcon  /> : <LocalOfferIcon  />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
       
      </Drawer>
      <Main open={open}>
       
        {/* <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
          enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
          imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
          Convallis convallis tellus id interdum velit laoreet id donec ultrices.
          Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
          nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
          leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
          feugiat vivamus at augue. At augue eget arcu dictum varius duis at
          consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
          sapien faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
          eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
          neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
          tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
          sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
          tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
          gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
          et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
          tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography> */}
      <Outlet/>
      </Main>
    </Box>
  );
}


// import * as React from 'react';
// import { styled, useTheme } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Drawer from '@mui/material/Drawer';
// import CssBaseline from '@mui/material/CssBaseline';
// import MuiAppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import List from '@mui/material/List';
// import Typography from '@mui/material/Typography';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
// import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
// import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
// import CategoryIcon from '@mui/icons-material/Category';
// import HomeWorkIcon from '@mui/icons-material/HomeWork';
// import LocalOfferIcon from '@mui/icons-material/LocalOffer';
// import Dashboard from './Dashboard/Dashboard';
// import { Outlet, useNavigate } from 'react-router-dom';
// import Grid from '@mui/material/Grid';

// const drawerWidth = 240;

// const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
//   ({ theme, open }) => ({
//     flexGrow: 1,
//     padding: theme.spacing(3),
//     transition: theme.transitions.create('margin', {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     marginLeft: `-${drawerWidth}px`,
//     ...(open && {
//       transition: theme.transitions.create('margin', {
//         easing: theme.transitions.easing.easeOut,
//         duration: theme.transitions.duration.enteringScreen,
//       }),
//       marginLeft: 0,
//     }),
//   }),
// );

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== 'open',
// })(({ theme, open }) => ({
//   transition: theme.transitions.create(['margin', 'width'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     width: `calc(100% - ${drawerWidth}px)`,
//     marginLeft: `${drawerWidth}px`,
//     transition: theme.transitions.create(['margin', 'width'], {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const DrawerHeader = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
//   justifyContent: 'flex-end',
// }));

// export default function Sidebar() {
//   const theme = useTheme();
//   const [open, setOpen] = React.useState(true);
  
//   const navigate = useNavigate();
//   const handleRoute = (route) => {
//     navigate(route);
//     setOpen(false); // Close the sidebar after clicking a link
//   };

//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };

//   const handleDrawerClose = () => {
//     setOpen(false);
//   };

//   return (
//     <Box sx={{ display: 'flex' }} style={{ marginTop: '35px' }}>
//       <CssBaseline />
//       <Grid container>
//         <Grid item xs={12}>
//           <AppBar position="fixed" open={open} style={{ backgroundColor: 'black' }}>
//             <Toolbar>
//               <IconButton
//                 color="white"
//                 aria-label="open drawer"
//                 onClick={handleDrawerOpen}
//                 edge="start"
//                 sx={{ mr: 2, ...(open && { display: 'none' }) }}
//               >
//                 <MenuIcon />
//               </IconButton>
//               <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, ml: 2 }}>
//                 Welcome:
//               </Typography>
//             </Toolbar>
//           </AppBar>
//         </Grid>
//         <Grid item xs={12} md={3}> {/* Adjust this based on your design */}
//           <Drawer
//             sx={{
//               width: drawerWidth,
//               flexShrink: 0,
//               '& .MuiDrawer-paper': {
//                 width: drawerWidth,
//                 boxSizing: 'border-box',
//                 backgroundColor: '#53616E',
//                 color: 'white'
//               },
//             }}
//             variant="persistent"
//             anchor="left"
//             open={open}
//           >
//             <DrawerHeader>
//               <img src='https://i.pinimg.com/736x/14/34/c0/1434c01245c6b30ba3d384b57a6abfd6.jpg'
//                 style={{ height: '48px', width: '48px', borderRadius: '50%', marginRight: '50px' }}>
//               </img>
//               <IconButton onClick={handleDrawerClose}>
//                 {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
//               </IconButton>
//             </DrawerHeader>
//             <Divider />
//             <List>
//               {[
//                 { text: 'Dashboard', icon: <DashboardCustomizeIcon />, route: '/dashboard' },
//                 { text: 'Users', icon: <PeopleOutlineIcon />, route: '/user' },
//                 { text: 'Role', icon: <PersonOutlineIcon />, route: '/role' },
//                 { text: 'Category', icon: <CategoryIcon />, route: '/category' },
//                 { text: 'Subcategory', icon: <CategoryIcon />, route: '/Subcategory' },
//                 { text: 'Retailer', icon: <HomeWorkIcon />, route: '/retailer' },
//                 { text: 'Offers', icon: <LocalOfferIcon />, route: '/offer' },
//               ].map((item, index) => (
//                 <ListItem key={index} disablePadding onClick={() => handleRoute(item.route)}>
//                   <ListItemButton>
//                     <ListItemIcon style={{ color: 'white' }}>
//                       {item.icon}
//                     </ListItemIcon>
//                     <ListItemText primary={item.text} />
//                   </ListItemButton>
//                 </ListItem>
//               ))}
//             </List>
//             <Divider />
//           </Drawer>
//         </Grid>
//         <Grid item xs={12} md={9}> {/* Adjust this based on your design */}
//           <Main open={open}>
//             <Outlet />
//           </Main>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }
