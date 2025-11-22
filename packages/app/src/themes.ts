import {
    createUnifiedTheme,
    createBaseThemeOptions,
    palettes
} from "@backstage/theme";

export const lightTheme = createUnifiedTheme({
    ...createBaseThemeOptions({
        palette: {
            ...palettes.light,
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
                    background: 'white',
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
                    borderColor: 'black !important'
                },
                root: {
                    '&:focus': {
                        outline: '2pt solid black',
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
                default: '#000',
                paper: '#000'
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
                root: {
                    fontWeight: 'bold',
                },
            },
        },
        BackstageContent: {
            styleOverrides: {
                root: {
                    backgroundColor: '#000',
                }
            }
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
                    backgroundColor: '#000',
                    boxShadow: 'none !important',
                    borderRadius: 28,
                },
            },
        },
        BackstageSidebar: {
            styleOverrides: {
                drawer: {
                    background: '#111'
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                focused: {
                    '& fieldset': {
                        borderColor: 'white !important',
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
                        borderColor: 'white !important',
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
                    background: '#000',
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
                        outline: '2pt solid white',
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
                    borderColor: 'white !important'
                },
                root: {
                    '&:focus': {
                        outline: '2pt solid white',
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
