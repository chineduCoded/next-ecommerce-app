import React from 'react'
import { Button, Dropdown, Input, Link, Row, Switch, Tooltip, useTheme, Avatar, Spacer, Text, Card } from '@nextui-org/react'
import NextLink from 'next/link'
import { FiLogOut, FiShoppingCart } from "react-icons/fi"
import { HiOutlineLogin, HiOutlineCog, HiOutlineUser } from "react-icons/hi"
import { MdFavoriteBorder, MdShoppingCart, MdShoppingBasket } from "react-icons/md"
import { TiShoppingBag } from "react-icons/ti"
import { FaUserAlt } from "react-icons/fa"
import { SunIcon } from '../icons/SunIcon'
import { MoonIcon } from '../icons/MoonIcon'
import { useTheme as useNextTheme } from "next-themes"
import { useStore } from '../utils/Store'



export const NavbarDesktop = () => {
    const { state: { cartItems } } = useStore()



    const loggedIn = false

    const { setTheme } = useNextTheme()
    const { isDark } = useTheme()

    const menuItems = [
        { key: "profile", name: "Profile", desc: "View Profile", icon: <FaUserAlt size={25} /> },
        { key: "settings", name: "Settings", desc: "View Settings", icon: <HiOutlineCog size={25} /> },
        { key: "logout", name: "Logout", desc: "User Exit", icon: <FiLogOut size={25} /> }
    ]
    const dropdownMenus = [
        { key: "user", href: "/account", name: "My Account", desc: "View My Account", icon: <HiOutlineUser size={22} color="#f31260" /> },
        { key: "orders", href: "/orders", name: "Orders", desc: "See your orders", icon: <MdShoppingBasket size={22} color="#f31260" /> },
        { key: "favourites", href: "/favourites", name: "Saved Items", desc: "Show my favourites", icon: <MdFavoriteBorder size={22} color="#f31260" /> }
    ]
    return (
        <>
            <NextLink href='/' passHref>
                <Link css={{ color: "$white", fontSize: "$xl", fontWeight: "$bold" }}>Shoppie</Link>
            </NextLink>
            <form>
                <Row>
                    <Input type='Search' placeholder='Search...' width='500px' aria-label="Search" />
                    <Button type='submit' color="error" aria-label='Search Button'>Search</Button>
                </Row>
            </form>
            <div>
                {
                    loggedIn === false ? (
                        <>
                            <Switch
                                checked={isDark}
                                size="lg"
                                color="error"
                                iconOn={<SunIcon filled />}
                                iconOff={<MoonIcon filled color="#F31260
                                " />}
                                onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
                            />
                            <Tooltip content="Cart" placement='bottom'>

                                {cartItems && cartItems.length > 0 ? (
                                    <NextLink href="#" passHref>
                                        <Link css={{ color: "$white" }}>
                                            <div style={{ marginInlineEnd: "10px" }}>
                                                <FiShoppingCart size={30} />
                                                <span style={{
                                                    width: "25px",
                                                    height: "25px",
                                                    borderRadius: "50%",
                                                    textAlign: "center",
                                                    color: "#fff",
                                                    backgroundColor: "#f31260",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    fontWeight: "bold",
                                                    position: "absolute",
                                                    top: "12px",
                                                    right: "65px"
                                                }}>{cartItems.length}</span>
                                            </div>
                                        </Link>
                                    </NextLink>

                                ) : (
                                    <NextLink href="#" passHref>
                                        <Link css={{ color: "$white", alignItems: "center" }}>
                                            <MdShoppingCart size={30} />
                                            <Text size={17} css={{ color: "$white", fontWeight: "$semibold", ml: 5 }}>Cart</Text>
                                        </Link>
                                    </NextLink>
                                )}


                            </Tooltip>

                            <Tooltip content="Account" placement='bottom'>
                                <NextLink href="#" passHref>
                                    <Dropdown placement="bottom-left">
                                        <Dropdown.Button flat color={'error'}>
                                            <HiOutlineUser size={30} />
                                            Account
                                        </Dropdown.Button>

                                        <Dropdown.Menu
                                            aria-label="Actions"
                                            css={{ $$dropdownMenuWidth: "280px", py: "$10" }}
                                        >
                                            <Dropdown.Section>
                                                <Dropdown.Item key="auth">
                                                    <Button color={'error'} css={{ w: "100%", mb: "$8" }}>Sign In</Button>
                                                </Dropdown.Item>
                                            </Dropdown.Section>
                                            <Dropdown.Section items={dropdownMenus}>
                                                {(item) => (

                                                    <Dropdown.Item
                                                        key={item.key}
                                                        description={item.desc}
                                                        icon={item.icon}>
                                                        {item.name}
                                                    </Dropdown.Item>

                                                )}

                                            </Dropdown.Section>

                                        </Dropdown.Menu>
                                    </Dropdown>
                                </NextLink>
                            </Tooltip>
                        </>
                    ) : (
                        <>
                            <Switch
                                checked={isDark}
                                size="lg"
                                color="error"
                                iconOn={<SunIcon filled />}
                                iconOff={<MoonIcon filled color="#F31260
                                " />}
                                onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
                            />
                            <Tooltip content="Cart" placement='bottom'>
                                <NextLink href="#" passHref>
                                    <Link css={{ color: "$white" }}>
                                        <MdShoppingCart size={30} />
                                        <Text b>Cart</Text>
                                    </Link>
                                </NextLink>
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
        </>
    )
}
