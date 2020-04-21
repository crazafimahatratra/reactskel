import React from 'react';
import CDrawer from './Components/CDrawer';
import CAppBar from './Components/CAppBar';

export default function Home() {
    const [openDrawer, setOpenDrawer] = React.useState(true);
    const handleDrawerOpen = () => {
        setOpenDrawer(true);
    }
    const handleDrawerClose = () => {
        setOpenDrawer(false);
    }
    return (
        <>
            <CAppBar onToggleMenu={handleDrawerOpen} openDrawer={openDrawer} />
            <CDrawer open={openDrawer} onClose={handleDrawerClose} />
            <main>
                <h1>Content</h1>
            </main>
        </>
    );
}