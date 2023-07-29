
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CardSideImage from '../cards/CardSideImage';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const introduction = [
  {
    title: 'Introduction',
    date: 'July 31',
    description:
      'This is a wider card with supporting text content.',
    image: 'https://media.istockphoto.com/id/527583227/photo/leather-purse-with-euro-notes-and-coins-on-white-background.jpg?s=612x612&w=0&k=20&c=kJvtEoK-lsyKS1T7NG5D8jbDPVg47HJKke6jItTk_Zo=',
    imageLabel: 'Image Text',
  },
  {
    title: 'Post title',
    date: 'July 31',
    description:
      'This is a wider card with supporting text content.',
    image: 'https://media.istockphoto.com/id/527583227/photo/leather-purse-with-euro-notes-and-coins-on-white-background.jpg?s=612x612&w=0&k=20&c=kJvtEoK-lsyKS1T7NG5D8jbDPVg47HJKke6jItTk_Zo=',
    imageLabel: 'Image Text',
  },
  {
    title: 'Post title',
    date: 'July 31',
    description:
      'This is a wider card with supporting text content.',
    image: 'https://media.istockphoto.com/id/527583227/photo/leather-purse-with-euro-notes-and-coins-on-white-background.jpg?s=612x612&w=0&k=20&c=kJvtEoK-lsyKS1T7NG5D8jbDPVg47HJKke6jItTk_Zo=',
    imageLabel: 'Image Text',
  },
  {
    title: 'Post title',
    date: 'July 31',
    description:
      'This is a wider card with supporting text content.',
    image: 'https://media.istockphoto.com/id/527583227/photo/leather-purse-with-euro-notes-and-coins-on-white-background.jpg?s=612x612&w=0&k=20&c=kJvtEoK-lsyKS1T7NG5D8jbDPVg47HJKke6jItTk_Zo=',
    imageLabel: 'Image Text',
  },
];

const defaultTheme = createTheme();

function HomeIntroduction() {
  return ( 
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Box
      sx={{
        bgcolor: 'background.paper',
        pt: 4,
        pb: 2,
      }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {introduction.map((post) => (
            <CardSideImage key={post.title} post={post} />
            ))}
          </Grid>
        </Container>        
      </Box>      
    </ThemeProvider>
   );
}

export default HomeIntroduction;