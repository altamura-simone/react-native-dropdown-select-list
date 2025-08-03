"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var SelectList = function (_a) {
    var setSelected = _a.setSelected, placeholder = _a.placeholder, boxStyles = _a.boxStyles, inputStyles = _a.inputStyles, dropdownStyles = _a.dropdownStyles, dropdownItemStyles = _a.dropdownItemStyles, dropdownTextStyles = _a.dropdownTextStyles, maxHeight = _a.maxHeight, data = _a.data, defaultOption = _a.defaultOption, _b = _a.searchicon, searchicon = _b === void 0 ? false : _b, _c = _a.arrowicon, arrowicon = _c === void 0 ? false : _c, _d = _a.closeicon, closeicon = _d === void 0 ? false : _d, _e = _a.search, search = _e === void 0 ? true : _e, _f = _a.searchPlaceholder, searchPlaceholder = _f === void 0 ? "search" : _f, _g = _a.notFoundText, notFoundText = _g === void 0 ? "No data found" : _g, disabledItemStyles = _a.disabledItemStyles, disabledTextStyles = _a.disabledTextStyles, _h = _a.onSelect, onSelect = _h === void 0 ? function () { } : _h, _j = _a.save, save = _j === void 0 ? 'key' : _j, _k = _a.dropdownShown, dropdownShown = _k === void 0 ? false : _k, fontFamily = _a.fontFamily;
    var oldOption = react_1.default.useRef(null);
    var _l = react_1.default.useState(true), _firstRender = _l[0], _setFirstRender = _l[1];
    var _m = react_1.default.useState(dropdownShown), dropdown = _m[0], setDropdown = _m[1];
    var _o = react_1.default.useState(""), selectedval = _o[0], setSelectedVal = _o[1];
    var _p = react_1.default.useState(200), height = _p[0], setHeight = _p[1];
    var animatedvalue = react_1.default.useRef(new react_native_1.Animated.Value(0)).current;
    var _q = react_1.default.useState(data), filtereddata = _q[0], setFilteredData = _q[1];
    var slidedown = function () {
        setDropdown(true);
        react_native_1.Animated.timing(animatedvalue, {
            toValue: height,
            duration: 500,
            useNativeDriver: false,
        }).start();
    };
    var slideup = function () {
        react_native_1.Animated.timing(animatedvalue, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false,
        }).start(function () { return setDropdown(false); });
    };
    react_1.default.useEffect(function () {
        if (maxHeight)
            setHeight(maxHeight);
    }, [maxHeight]);
    react_1.default.useEffect(function () {
        setFilteredData(data);
    }, [data]);
    react_1.default.useEffect(function () {
        if (_firstRender) {
            _setFirstRender(false);
            return;
        }
        onSelect();
    }, [selectedval]);
    react_1.default.useEffect(function () {
        if (!_firstRender && defaultOption && oldOption.current != defaultOption.key) {
            // oldOption.current != null
            oldOption.current = defaultOption.key;
            setSelected(defaultOption.key);
            setSelectedVal(defaultOption.value);
        }
        if (defaultOption && _firstRender && defaultOption.key != undefined) {
            oldOption.current = defaultOption.key;
            setSelected(defaultOption.key);
            setSelectedVal(defaultOption.value);
        }
    }, [defaultOption]);
    react_1.default.useEffect(function () {
        if (!_firstRender) {
            if (dropdownShown)
                slidedown();
            else
                slideup();
        }
    }, [dropdownShown]);
    return (react_1.default.createElement(react_native_1.View, null,
        (dropdown && search)
            ?
                react_1.default.createElement(react_native_1.View, { style: [styles.wrapper, boxStyles] },
                    react_1.default.createElement(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', flex: 1 } },
                        (!searchicon)
                            ?
                                react_1.default.createElement(react_native_1.Image, { source: require('../assets/images/search.png'), resizeMode: 'contain', style: { width: 20, height: 20, marginRight: 7 } })
                            :
                                searchicon,
                        react_1.default.createElement(react_native_1.TextInput, { placeholder: searchPlaceholder, onChangeText: function (val) {
                                var result = data.filter(function (item) {
                                    val.toLowerCase();
                                    var row = item.value.toLowerCase();
                                    return row.search(val.toLowerCase()) > -1;
                                });
                                setFilteredData(result);
                            }, style: [{ padding: 0, height: 20, flex: 1, fontFamily: fontFamily }, inputStyles] }),
                        react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: function () { return slideup(); } }, (!closeicon)
                            ?
                                react_1.default.createElement(react_native_1.Image, { source: require('../assets/images/close.png'), resizeMode: 'contain', style: { width: 17, height: 17 } })
                            :
                                closeicon)))
            :
                react_1.default.createElement(react_native_1.TouchableOpacity, { style: [styles.wrapper, boxStyles], onPress: function () { if (!dropdown) {
                        react_native_1.Keyboard.dismiss();
                        slidedown();
                    }
                    else {
                        slideup();
                    } } },
                    react_1.default.createElement(react_native_1.Text, { style: [{ fontFamily: fontFamily }, inputStyles] }, (selectedval == "") ? (placeholder) ? placeholder : 'Select option' : selectedval),
                    (!arrowicon)
                        ?
                            react_1.default.createElement(react_native_1.Image, { source: require('../assets/images/chevron.png'), resizeMode: 'contain', style: { width: 20, height: 20 } })
                        :
                            arrowicon),
        (dropdown)
            ?
                react_1.default.createElement(react_native_1.Animated.View, { style: [{ maxHeight: animatedvalue }, styles.dropdown, dropdownStyles] },
                    react_1.default.createElement(react_native_1.ScrollView, { contentContainerStyle: { paddingVertical: 10, overflow: 'hidden' }, nestedScrollEnabled: true }, (filtereddata.length >= 1)
                        ?
                            filtereddata.map(function (item, index) {
                                var _a, _b, _c, _d;
                                var key = (_b = (_a = item.key) !== null && _a !== void 0 ? _a : item.value) !== null && _b !== void 0 ? _b : item;
                                var value = (_c = item.value) !== null && _c !== void 0 ? _c : item;
                                var disabled = (_d = item.disabled) !== null && _d !== void 0 ? _d : false;
                                if (disabled) {
                                    return (react_1.default.createElement(react_native_1.TouchableOpacity, { style: [styles.disabledoption, disabledItemStyles], key: index, onPress: function () { } },
                                        react_1.default.createElement(react_native_1.Text, { style: [{ color: '#c4c5c6', fontFamily: fontFamily }, disabledTextStyles] }, value)));
                                }
                                else {
                                    return (react_1.default.createElement(react_native_1.TouchableOpacity, { style: [styles.option, dropdownItemStyles], key: index, onPress: function () {
                                            if (save === 'value') {
                                                setSelected(value);
                                            }
                                            else {
                                                setSelected(key);
                                            }
                                            setSelectedVal(value);
                                            slideup();
                                            setTimeout(function () { setFilteredData(data); }, 800);
                                        } },
                                        react_1.default.createElement(react_native_1.Text, { style: [{ fontFamily: fontFamily }, dropdownTextStyles] }, value)));
                                }
                            })
                        :
                            react_1.default.createElement(react_native_1.TouchableOpacity, { style: [styles.option, dropdownItemStyles], onPress: function () {
                                    setSelected(undefined);
                                    setSelectedVal("");
                                    slideup();
                                    setTimeout(function () { return setFilteredData(data); }, 800);
                                } },
                                react_1.default.createElement(react_native_1.Text, { style: [{ fontFamily: fontFamily }, dropdownTextStyles] }, notFoundText))))
            :
                null));
};
exports.default = SelectList;
var styles = react_native_1.StyleSheet.create({
    wrapper: { borderWidth: 1, borderRadius: 10, borderColor: 'gray', paddingHorizontal: 20, paddingVertical: 12, flexDirection: 'row', justifyContent: 'space-between' },
    dropdown: { borderWidth: 1, borderRadius: 10, borderColor: 'gray', marginTop: 10, overflow: 'hidden' },
    option: { paddingHorizontal: 20, paddingVertical: 8, overflow: 'hidden' },
    disabledoption: { paddingHorizontal: 20, paddingVertical: 8, flexDirection: 'row', alignItems: 'center', backgroundColor: 'whitesmoke', opacity: 0.9 }
});
