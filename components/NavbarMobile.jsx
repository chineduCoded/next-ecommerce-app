import React from 'react'
import { Dropdown, Input, Link, Row, Switch, Tooltip, Image, Spacer } from '@nextui-org/react'
import NavLink from 'next/link'
import { FiLogOut, FiShoppingCart } from "react-icons/fi"
import { HiOutlineLogin, HiOutlineCog } from "react-icons/hi"
import { FaUserAlt } from "react-icons/fa"
import { SunIcon } from '../icons/SunIcon'
import { MoonIcon } from '../icons/MoonIcon'
import styles from "../styles/Home.module.css"

export const NavbarMobile = () => {
    const loggedIn = false

    const menuItems = [
        { key: "profile", name: "Profile", desc: "View Profile", icon: <FaUserAlt size={25} /> },
        { key: "settings", name: "Settings", desc: "View Settings", icon: <HiOutlineCog size={25} /> },
        { key: "logout", name: "Logout", desc: "User Exit", icon: <FiLogOut size={25} /> }
    ]

    return (
        <div className={styles.mobile}>
            <div className={styles.contentWrapper}>
                <div style={{ flex: 1 }}>
                    <Image src='/images/logo.png' alt='logo image' width='50px' height='35px' />
                </div>
                <div>
                    {
                        loggedIn === false ? (
                            <>
                                <Switch
                                    checked={false}
                                    size="lg"
                                    color="error"
                                    iconOn={<SunIcon filled />}
                                    iconOff={<MoonIcon filled />}
                                />
                                <Tooltip content="Cart" placement='bottom'>
                                    <NavLink href="#">
                                        <Link css={{ color: "$white" }}>
                                            <FiShoppingCart size={30} />
                                        </Link>
                                    </NavLink>
                                </Tooltip>
                                <Tooltip content="Login" placement='bottom'>
                                    <NavLink href="#">
                                        <Link css={{ color: "$white" }}>
                                            <HiOutlineLogin size={30} />
                                        </Link>
                                    </NavLink>
                                </Tooltip>
                            </>
                        ) : (
                            <>
                                <Switch
                                    checked={false}
                                    size="lg"
                                    color="error"
                                    iconOn={<SunIcon filled />}
                                    iconOff={<MoonIcon filled />}
                                />
                                <Tooltip content="Cart" placement='bottom'>
                                    <NavLink href="#">
                                        <Link css={{ color: "$white" }}>
                                            <FiShoppingCart size={30} />
                                        </Link>
                                    </NavLink>
                                </Tooltip>
                                <Dropdown placement='bottom-right'>
                                    <Dropdown.Trigger>
                                        <User
                                            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                                            name="Ariana Wattson"
                                            description="UI/UX Designer @Github"
                                            size="md"
                                            color="error"
                                            bordered

                                            pointer
                                        />
                                    </Dropdown.Trigger>
                                    <Dropdown.Menu color='error' aria-label='Dynamic Actions' items={menuItems}>
                                        {(item) => (
                                            <Dropdown.Item
                                                key={item.key}
                                                css={{ height: "$18" }}
                                                description={item.desc}
                                                icon={item.icon}
                                                color={item.key === "logout" ? "error" : "default"}
                                            >
                                                {item.name}
                                            </Dropdown.Item>
                                        )}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </>
                        )
                    }
                </div>
            </div>
            <Spacer y={0.07} />
            <div>
                <form>
                    <Row>
                        <Input type='Search' placeholder='Search...' fullWidth aria-label='Search' />
                    </Row>
                </form>
            </div>
        </div>
    )
}
