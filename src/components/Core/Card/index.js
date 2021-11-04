import { Box, CardContent, Typography } from "@material-ui/core";
import { Card as MaterialUICard } from "@material-ui/core";

const Card = ({ title, children }) => {
    return (
        <MaterialUICard>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {title}
                </Typography>
                <Box>
                    {children}
                </Box>
            </CardContent>
        </MaterialUICard>
    )
}

export default Card;