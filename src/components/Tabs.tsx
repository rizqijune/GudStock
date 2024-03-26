import { AnimationDirection, CreateAnimation, IonFab, IonFabButton, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { albums, home, person, settings } from 'ionicons/icons';
import Tab1 from '../pages/Tab1';
import Tab2 from '../pages/Tab2';
import Tab3 from '../pages/Tab3';
import { FC, useRef } from "react";
import { useEffect, useState } from "react";
import { Redirect, Route } from "react-router";
import './Tabs.css'
import Tab4 from "../pages/Tab4";

const SwitchTabBar = () => {

    const [activeTab, setActiveTab] = useState("tab0");
    const switchRefs = useRef<(CreateAnimation | null)[]>([]);

    const tabs = [

        {
            label: "Home",
            url: "/home",
            icon: home,
            color: "#76b140",
            backgroundColor: "#00000000",
            component: Tab1
        },
        {
            label: "Profile",
            url: "/profile",
            class: "list",
            icon: person,
            color: "#e46062",
            backgroundColor: "#00000000",
            component: Tab2
        },
        {
            label: "Stock",
            url: "/stock",
            class: "stock",
            icon: albums,
            color: "#3578e5",
            backgroundColor: "#00000000",
            component: Tab4
        },
        {
            label: "Settings",
            url: "/settings",
            icon: settings,
            color: "#3578e5",
            backgroundColor: "#00000000",
            component: Tab3
        }
    ];

    const revealAnimation = {

        property: "transform",
        fromValue: "translateX(-30px)",
        toValue: "translateX(0px)"
    };

    const switchAnimation = {
        duration: 200,
        direction: "normal" as AnimationDirection | undefined,
        fromTo: [revealAnimation],
        easing: "ease-in-out"
        
    };

    const getTabButtonStyle = (tab: { label?: string; url?: string; icon?: string; color: any; backgroundColor: any; component?: FC<{}>; }) => {

        const tabStyle = {

            backgroundColor: tab.backgroundColor,
            color: tab.color,
            transition: "0.5s all ease-in-out"
        };

        return tabStyle;
    }

    useEffect(() => {
        const tabIndex = parseInt(activeTab.match(/\d+/)?.[0] ?? '', 10);
        const currentRef = switchRefs.current[tabIndex];
        if (currentRef && 'animation' in currentRef) {
            currentRef.animation.play();
        }
    }, [activeTab]);
    

    return (

        <IonReactRouter>
            <IonTabs>
                <IonRouterOutlet onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>

                    {tabs.map((tab, index) => {

                        return (
                            <Route key={index} exact path={tab.url}>
                                <tab.component />
                            </Route>
                        );
                    })}

                    <Route exact path="/">
                        <Redirect to="/home" />
                    </Route>
                </IonRouterOutlet>
                <IonTabBar slot="bottom" onIonTabsDidChange={e => setActiveTab(e.detail.tab)}>

                    {tabs.map((tab, index) => {

                        const tabStyle = getTabButtonStyle(tab);
                        const isActive = activeTab === `tab${index}`;

                        return (
                            <IonTabButton key={index} style={isActive ? tabStyle : {}} tab={`tab${index}`} href={tab.url} className={tab.class}>

                                <IonIcon icon={tab.icon} />

                                {isActive && <CreateAnimation ref={ref => switchRefs.current[index] = ref} {...switchAnimation}>
                                    <IonLabel>{tab.label}</IonLabel>
                                </CreateAnimation>}
                            </IonTabButton>
                        );
                    })}
                </IonTabBar>
            </IonTabs>
            <IonFab slot="fixed" horizontal="end" vertical="top">
                <IonFabButton><IonIcon icon={settings}/></IonFabButton>
            </IonFab>
        </IonReactRouter>
    );
}

export default SwitchTabBar;