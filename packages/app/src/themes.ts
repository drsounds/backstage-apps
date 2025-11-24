// @ts-nocheck
import {
    createUnifiedTheme,
    createBaseThemeOptions,
    palettes
} from "@backstage/theme";

export const lightTheme = createUnifiedTheme({
    ...createBaseThemeOptions({
        palette: {
            ...palettes.light,
            text: {
                default: '#282828',
            },
            background: {
                default: '#fff',
            },
            primary: {
                ...palettes.light.primary,
                main: '#0000c9',
            },
        },

    }),
    htmlFontSize: 15,
    fontFamily: 'DM Sans, sans-serif',
    components: {
        MuiTypography: {
            styleOverrides: {
                body1: {
                    fontWeight: 'bold',
                },
                body2: {
                    fontWeight: 'bold',
                },
                root: {
                    fontWeight: 'bold',
                },
            },
        },
        BackstageContent: {
            styleOverrides: {
                root: {
                    backgroundColor: '#fff',
                }
            }
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    color: '#010101',
                },
            },
        },
        MuiList: {
            defaultProps: {
                elevation: 0,
            },
            styleOverrides: {
                root: {
                    elevation: 0,
                },
            },
        },
        MuiPaper: {
            defaultProps: {
                elevation: 0,
            },
            styleOverrides: {
                root: {
                    boxShadow: 'none !important',
                    borderRadius: 28,
                },
            },
        },
        BackstageHeader: {
            defaultProps: {
                disableElevation: true
            },
            styleOverrides: {
                title: {
                    color: '#282828'
                },
                subtitle: {
                    color: '#282828'
                },
                header: {
                    backgroundImage: 'none',
                    background: '#fff',
                    color: '#111',
                    boxShadow: 'none !important',
                }
            }
        },
        MuiButton: {
            defaultProps: {
                disableRipple: true,
                disableElevation: true,
            },
            styleOverrides: {
                outlined: {
                    borderColor: '#000 !important'
                },
                root: {
                    '&:focus': {
                        outline: '2pt solid #000',
                        outlineOffset: '2pt',
                    },
                    textTransform: 'none !important',
                    borderRadius: 28,
                    fontWeight: 'bold',
                    paddingLeft: 25,
                    paddingRight: 25,
                    paddingTop: 10,
                    paddingBottom: 10,
                    '&:active': {
                        scale: 1
                    },
                    '&:hover': {
                        scale: 1.05
                    }
                },
            },
        }
    }
});

export const darkTheme = createUnifiedTheme({
    ...createBaseThemeOptions({
        palette: {
            ...palettes.dark,
            background: {
                default: 'transparent',
                paper: 'transparent'
            },
            text: {
                default: '#aaa',
                secondary: '#aaa',
                primary: '#aaa',
            },
            primary: {
                ...palettes.light.primary,
                main: '#00c900',
            },
        },

    }),
    htmlFontSize: 15,
    fontFamily: 'DM Sans, sans-serif',
    components: {
        MuiTypography: {
            styleOverrides: {
                body1: {
                    fontWeight: 'bold',
                },
                body2: {
                    fontWeight: 'bold',
                },
                root: {
                    fontWeight: 'bold',
                },
            },
        },
        BackstageContent: {
            styleOverrides: {
                root: {
                    backgroundColor: 'transparent',
                }
            }
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    color: '#ffffff',
                },
            },
        },
        MuiList: {
            defaultProps: {
                elevation: 0,
            },
            styleOverrides: {
                root: {
                    elevation: 0,
                },
            },
        },
        MuiPaper: {
            defaultProps: {
                elevation: 0,
            },
            styleOverrides: {
                root: {
                    backgroundColor: 'transparent',
                    boxShadow: 'none !important',
                    borderRadius: 28,
                },
            },
        },
        BackstageSidebar: {
            styleOverrides: {
                drawer: {
                    background: 'transparent'
                }
            }
        },
        MuiSelect: {
            styleOverrides: {
                root: {
                    '&.Mui-focused': {
                        borderColor: '#fff !important',
                        borderWidth: '2px !important',
                    }
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                focused: {
                    '& fieldset': {
                        borderColor: '#fff !important',
                        borderWidth: '2px !important',
                    }
                }
            }
        },
        BackstageAutocompleteBase: {
            styleOverrides: {
                notchedOutline: {
                    display: 'none !important'
                },
                inputRoot: {
                    '> fieldset': {
                        borderColor: '#fff !important',
                    }
                }
            }
        },
        BackstageHeader: {
            defaultProps: {
                disableElevation: true
            },
            styleOverrides: {
                title: {
                    color: '#eeeeee'
                },
                subtitle: {
                    color: '#eeeeee'
                },
                header: {
                    backgroundImage: 'none',
                    background: 'transparent',
                    color: '#eeeeee',
                    boxShadow: 'none !important',
                }
            }
        },
        MuiButtonBase: {
            defaultProps: {
                disableRipple: true,
                disableElevation: true,
            },
            styleOverrides: {
                root: {
                    '&:focus': {
                        outline: '2pt solid #fff',
                        outlineOffset: '2pt',
                    },
                    '&:active': {
                        scale: 1
                    },
                    '&:hover': {
                        scale: 1.05
                    }
                }
            }
        },
        MuiButton: {
            defaultProps: {
                disableRipple: true,
                disableElevation: true,
            },
            styleOverrides: {
                outlined: {
                    borderColor: '#fff !important'
                },
                root: {
                    '&:focus': {
                        outline: '2pt solid #fff',
                        outlineOffset: '2pt',
                    },
                    textTransform: 'none !important',
                    borderRadius: 28,
                    fontWeight: 'bold',
                    paddingLeft: 25,
                    paddingRight: 25,
                    paddingTop: 10,
                    paddingBottom: 10,
                    '&:active': {
                        scale: 1
                    },
                    '&:hover': {
                        scale: 1.05
                    }
                },
            },
        }
    }
});
