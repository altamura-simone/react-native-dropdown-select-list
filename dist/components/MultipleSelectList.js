"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var MultipleSelectList = function (_a) {
    var initValue = _a.initValue, fontFamily = _a.fontFamily, setSelected = _a.setSelected, _b = _a.selectedShow, selectedShow = _b === void 0 ? false : _b, placeholder = _a.placeholder, boxStyles = _a.boxStyles, inputStyles = _a.inputStyles, dropdownStyles = _a.dropdownStyles, dropdownItemStyles = _a.dropdownItemStyles, dropdownTextStyles = _a.dropdownTextStyles, maxHeight = _a.maxHeight, data = _a.data, _c = _a.searchicon, searchicon = _c === void 0 ? false : _c, _d = _a.arrowicon, arrowicon = _d === void 0 ? false : _d, _e = _a.closeicon, closeicon = _e === void 0 ? false : _e, _f = _a.search, search = _f === void 0 ? true : _f, _g = _a.searchPlaceholder, searchPlaceholder = _g === void 0 ? "search" : _g, _h = _a.onSelect, onSelect = _h === void 0 ? function () { } : _h, label = _a.label, _j = _a.notFoundText, notFoundText = _j === void 0 ? "No data found" : _j, disabledItemStyles = _a.disabledItemStyles, disabledTextStyles = _a.disabledTextStyles, disabledCheckBoxStyles = _a.disabledCheckBoxStyles, labelStyles = _a.labelStyles, badgeStyles = _a.badgeStyles, badgeTextStyles = _a.badgeTextStyles, checkBoxStyles = _a.checkBoxStyles, _k = _a.save, save = _k === void 0 ? 'key' : _k, _l = _a.dropdownShown, dropdownShown = _l === void 0 ? false : _l;
    var _m = react_1.default.useState(true), _firstRender = _m[0], _setFirstRender = _m[1];
    var _o = react_1.default.useState(dropdownShown), dropdown = _o[0], setDropdown = _o[1];
    // const [selectedval, setSelectedVal] = React.useState<any>([]);
    var _p = react_1.default.useState(350), height = _p[0], setHeight = _p[1];
    var animatedvalue = react_1.default.useRef(new react_native_1.Animated.Value(0)).current;
    var _q = react_1.default.useState(data), filtereddata = _q[0], setFilteredData = _q[1];
    var _r = react_1.default.useState([]), selectedData = _r[0], setSelectedData = _r[1]; // Lista di tutte le chiavi selezionate
    react_1.default.useEffect(function () {
        if (initValue && initValue.length > 0) {
            setSelectedData(initValue);
        }
    }, [initValue]);
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
    }, [selectedData]);
    react_1.default.useEffect(function () {
        if (!_firstRender) {
            if (dropdownShown)
                slidedown();
            else
                slideup();
        }
    }, [dropdownShown]);
    var handleSelectToggle = function (key) {
        var alreadySelected = selectedData.includes(key);
        var updatedSelected;
        if (alreadySelected) {
            updatedSelected = selectedData.filter(function (k) { return k !== key; });
        }
        else {
            updatedSelected = __spreadArray(__spreadArray([], selectedData, true), [key], false);
        }
        setSelectedData(updatedSelected);
        var selectedItems = data.filter(function (d) { return updatedSelected.includes(d.key); });
        var result = save === 'value' ? selectedItems.map(function (d) { return d.value; }) : updatedSelected;
        setSelected(result);
    };
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
                                    var row = (item.value || "").toLowerCase();
                                    return row.includes(val.toLowerCase());
                                });
                                setFilteredData(result);
                            }, style: [{ padding: 0, height: 20, flex: 1, fontFamily: fontFamily }, inputStyles] }),
                        react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: function () {
                                slideup();
                                // setTimeout(() => setFilteredData(data), 800)
                            } }, (!closeicon)
                            ?
                                react_1.default.createElement(react_native_1.Image, { source: require('../assets/images/close.png'), resizeMode: 'contain', style: { width: 17, height: 17 } })
                            :
                                closeicon)))
            :
                ((selectedData === null || selectedData === void 0 ? void 0 : selectedData.length) > 0)
                    ?
                        react_1.default.createElement(react_native_1.TouchableOpacity, { style: [styles.wrapper, boxStyles], onPress: function () { if (!dropdown) {
                                react_native_1.Keyboard.dismiss();
                                slidedown();
                            }
                            else {
                                slideup();
                            } } },
                            react_1.default.createElement(react_native_1.View, null,
                                react_1.default.createElement(react_native_1.Text, { style: [{ fontWeight: '600', fontFamily: fontFamily }, labelStyles] }, label),
                                react_1.default.createElement(react_native_1.View, { style: { flexDirection: 'row', marginBottom: 8, flexWrap: 'wrap' } }, selectedData.map(function (key, index) {
                                    var item = data.find(function (d) { return d.key === key; });
                                    if (!item)
                                        return null;
                                    return (react_1.default.createElement(react_native_1.View, { key: index, style: [{ backgroundColor: 'gray', paddingHorizontal: 20, paddingVertical: 5, borderRadius: 50, marginRight: 10, marginTop: 10 }, badgeStyles] },
                                        react_1.default.createElement(react_native_1.Text, { style: [{ color: 'white', fontSize: 12, fontFamily: fontFamily }, badgeTextStyles] }, item.value)));
                                }))))
                    :
                        react_1.default.createElement(react_native_1.TouchableOpacity, { style: [styles.wrapper, boxStyles], onPress: function () { if (!dropdown) {
                                react_native_1.Keyboard.dismiss();
                                slidedown();
                            }
                            else {
                                slideup();
                            } } },
                            react_1.default.createElement(react_native_1.Text, { style: [{ fontFamily: fontFamily }, inputStyles] }, (selectedData.length == 0) ? (placeholder) ? placeholder : 'Select option' : data.filter(function (d) { return selectedData.includes(d.key); }).map(function (d) { return d.value; }).join(",")),
                            (!arrowicon)
                                ?
                                    react_1.default.createElement(react_native_1.Image, { source: require('../assets/images/chevron.png'), resizeMode: 'contain', style: { width: 20, height: 20 } })
                                :
                                    arrowicon),
        (dropdown)
            ?
                react_1.default.createElement(react_native_1.Animated.View, { style: [{ maxHeight: animatedvalue }, styles.dropdown, dropdownStyles] },
                    react_1.default.createElement(react_native_1.View, { style: [{ maxHeight: height }] },
                        react_1.default.createElement(react_native_1.ScrollView, { contentContainerStyle: { paddingVertical: 10 }, nestedScrollEnabled: true }, (filtereddata.length >= 1)
                            ?
                                filtereddata.map(function (item, index) {
                                    var _a, _b, _c, _d;
                                    var key = (_b = (_a = item.key) !== null && _a !== void 0 ? _a : item.value) !== null && _b !== void 0 ? _b : item;
                                    var value = (_c = item.value) !== null && _c !== void 0 ? _c : item;
                                    var disabled = (_d = item.disabled) !== null && _d !== void 0 ? _d : false;
                                    if (disabled) {
                                        return (react_1.default.createElement(react_native_1.TouchableOpacity, { style: [styles.disabledoption, disabledItemStyles], key: index },
                                            react_1.default.createElement(react_native_1.View, { style: [{ width: 15, height: 15, marginRight: 10, borderRadius: 3, justifyContent: 'center', alignItems: 'center', backgroundColor: '#c4c5c6' }, disabledCheckBoxStyles] }, (selectedData === null || selectedData === void 0 ? void 0 : selectedData.includes(key))
                                                ?
                                                    react_1.default.createElement(react_native_1.Image, { key: index, source: require('../assets/images/check.png'), resizeMode: 'contain', style: [{ width: 8, height: 8, paddingLeft: 7 }] })
                                                :
                                                    null),
                                            react_1.default.createElement(react_native_1.Text, { style: [{ fontFamily: fontFamily, color: '#c4c5c6' }, disabledTextStyles] }, value)));
                                    }
                                    else {
                                        return (react_1.default.createElement(react_native_1.TouchableOpacity, { style: [styles.option, dropdownItemStyles], key: index, onPress: function () { return handleSelectToggle(key); } },
                                            react_1.default.createElement(react_native_1.View, { style: [{ width: 15, height: 15, borderWidth: 1, marginRight: 10, borderColor: 'gray', borderRadius: 3, justifyContent: 'center', alignItems: 'center' }, checkBoxStyles] }, (selectedData === null || selectedData === void 0 ? void 0 : selectedData.includes(key))
                                                ?
                                                    react_1.default.createElement(react_native_1.Image, { key: index, source: require('../assets/images/check.png'), resizeMode: 'contain', style: { width: 8, height: 8, paddingLeft: 7 } })
                                                :
                                                    null),
                                            react_1.default.createElement(react_native_1.Text, { style: [{ fontFamily: fontFamily }, dropdownTextStyles] }, value)));
                                    }
                                })
                            :
                                react_1.default.createElement(react_native_1.TouchableOpacity, { style: [styles.option, dropdownItemStyles], onPress: function () {
                                        setSelected(undefined);
                                        setSelectedData([]);
                                        slideup();
                                        setTimeout(function () { return setFilteredData(data); }, 800);
                                    } },
                                    react_1.default.createElement(react_native_1.Text, { style: dropdownTextStyles }, notFoundText))),
                        ((selectedData === null || selectedData === void 0 ? void 0 : selectedData.length) > 0) && selectedShow
                            ?
                                react_1.default.createElement(react_native_1.Pressable, null,
                                    react_1.default.createElement(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 20 } },
                                        react_1.default.createElement(react_native_1.Text, { style: { marginRight: 20, fontWeight: '600', fontFamily: fontFamily } }, "Selected"),
                                        react_1.default.createElement(react_native_1.View, { style: { height: 1, flex: 1, backgroundColor: 'gray' } })),
                                    react_1.default.createElement(react_native_1.View, { style: { flexDirection: 'row', paddingHorizontal: 20, marginBottom: 20, flexWrap: 'wrap' } }, selectedData === null || selectedData === void 0 ? void 0 : selectedData.map(function (item, index) {
                                        var _a;
                                        return (react_1.default.createElement(react_native_1.View, { key: index, style: [{ backgroundColor: 'gray', paddingHorizontal: 20, paddingVertical: 5, borderRadius: 50, marginRight: 10, marginTop: 10 }, badgeStyles] },
                                            react_1.default.createElement(react_native_1.Text, { style: [{ color: 'white', fontSize: 12, fontFamily: fontFamily }, badgeTextStyles] }, (_a = data.find(function (d) { return d.key == item; })) === null || _a === void 0 ? void 0 : _a.value)));
                                    })))
                            :
                                null))
            :
                null));
};
exports.default = MultipleSelectList;
var styles = react_native_1.StyleSheet.create({
    wrapper: { borderWidth: 1, borderRadius: 10, borderColor: 'gray', paddingHorizontal: 20, paddingVertical: 12, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
    dropdown: { borderWidth: 1, borderRadius: 10, borderColor: 'gray', overflow: 'hidden' },
    option: { paddingHorizontal: 20, paddingVertical: 8, flexDirection: 'row', alignItems: 'center' },
    disabledoption: { paddingHorizontal: 20, paddingVertical: 8, flexDirection: 'row', alignItems: 'center', backgroundColor: 'whitesmoke' }
});
