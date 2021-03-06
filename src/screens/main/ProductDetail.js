import React, { Component } from "react";
import {
    View,
    SafeAreaView,
    Image,
    TouchableOpacity,
    ScrollView,
    FlatList,
    Dimensions,
    Alert,
} from "react-native";
import ControlText from "../../component/ControlText";
import { CustomHeader } from "../../index";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import AppStyle from "../../style";
import { IMAGE } from "../../constant/Image";
import { postApi } from "../../apis/Apis";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default class ProducDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            product: {},
            cart: [],
            cartCount: [],
            apiUrl: "",
            GroupId: 0,
            config: {},
            token: '',
            gioHangId: 0,
            userId: 0
        };
    }

    async componentDidMount() {
        this.props.navigation.addListener("focus", async () => {
            await AsyncStorage.getItem('token').then((value) => {
                this.setState({ token: JSON.parse(value).data });
            });
            await AsyncStorage.getItem('apiUrl').then((value) => {
                this.setState({
                    config: JSON.parse(value)
                });
            });
            this.state.userId = 1;
            const { GroupId } = this.props.route.params;
            this.setState({ GroupId: GroupId })
            await this.loadData();
        })
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: "#f0f9ff" }}>
                <CustomHeader
                    title="Món ăn"
                    isHome={true}
                    navigation={this.props.navigation}
                />
                <ScrollView>
                    <FlatList
                        horizontal={false}
                        data={this.state.data}
                        renderItem={({ item, index }) =>
                            this.renderItem(item, index)
                        }
                        keyExtractor={(item, index) => "keyP" + index}
                    />
                </ScrollView>
                {this.viewCart()}
            </SafeAreaView>
        )
    }

    renderItem = (item, index) => {
        return (
            <View
                key={"P_" + item.Id}
                style={[{ width: windowWidth }, AppStyle.productView]}>
                <Image
                    source={{ uri: `${this.state.config.urlImage}${item.HINH_ANH}` }}
                    style={{ width: windowWidth * 0.4, height: windowHeight * 0.2 }}
                    resizeMode={"stretch"}
                />
                <View style={[{ width: windowWidth * 0.6 }, AppStyle.product]}>
                    <ControlText
                        style={AppStyle.productTitle}
                    >
                        {item.TEN}
                    </ControlText>
                    <ControlText
                        style={{
                            marginLeft: 10,
                            marginTop: 10,
                            fontSize: 14,
                        }}
                    >
                        {item.DON_GIA} đ
                    </ControlText>
                    <View style={[{ justifyContent: 'center', alignItems: "center" }, AppStyle.productAdd]}>
                        <TouchableOpacity onPress={() => { this.addItem(item) }}>
                            <Image source={IMAGE.ICON_ADD} style={AppStyle.productIconAdd}></Image>
                        </TouchableOpacity>
                        {
                            this.viewCount(item)
                        }

                        <TouchableOpacity onPress={() => { this.removeItem(item) }}>
                            <Image source={IMAGE.ICON_SUB} style={AppStyle.productIconAdd}></Image>
                        </TouchableOpacity>

                    </View>
                </View>

            </View>
        )
    }

    loadData() {
        try {

            axios({
                method: 'POST',
                url: `${this.state.config.apiUrl}GetSanPhamTheoheLoai`,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.state.token}`
                },
                data: {
                    ID: this.state.GroupId
                }
            }).then((response) => {
                this.setState({
                    data: response.data
                });

                let data = {};
                data.data = response.data;
                this.setState({
                    cart: data
                });
            }).catch(function (error) {
                console.log("!!!!!!!!!!!!!ERROR!!!!!!!!!!!\n")
                console.log(error);
            });
        } catch (error) {
            Alert.alert("Load loadData loi:", JSON.stringify(error));
        }
    }

    addItem = (item) => {
        try {
            let cart = this.state.cart;
            let data = this.state.cart.data;
            var index = data.indexOf(item);
            if (index !== -1) {
                if (cart.COUNT) {
                    cart.COUNT++;
                    cart.TOTAL += item.DON_GIA;
                }
                else {
                    cart.COUNT = 1;
                    cart.TOTAL = item.DON_GIA;
                }
                if (data[index].COUNT && data[index].COUNT > 0) {
                    data[index].COUNT++;
                    data[index].TOTAL += item.DON_GIA;
                    data[index].ID = item.Id;
                    cart.data = data;
                    this.setState({ cart: cart });
                }
                else {
                    data[index].COUNT = 1;
                    data[index].TOTAL = item.DON_GIA;
                    cart.data = data;
                    this.setState({ cart: cart });
                }
            }
        }
        catch (error) {
            console.log('!!!addItem error!!!', error);
        }
    }

    removeItem = (item) => {
        try {
            let cart = this.state.cart;
            let data = this.state.cart.data;
            var index = data.indexOf(item);
            if (index !== -1) {
                if (cart.COUNT && cart.COUNT > 0) {
                    cart.COUNT--;
                    cart.TOTAL -= item.DON_GIA;
                }
                if (data[index].COUNT && data[index].COUNT > 0) {
                    data[index].COUNT--;
                    data[index].TOTAL -= item.DON_GIA;

                    cart.data = data;
                    this.setState({ cart: cart });
                }
            }
        }
        catch (error) {
            console.log('!!!removeItem error!!!', error);
        }
    }

    addCart = (item) => {
        try {

            const data = this.state.data || [];

        }
        catch (error) {
            console.log('!!!addItem error!!!', error);
        }
    }

    viewCount = (item) => {
        var data = this.state.cart.data;
        if (data) {
            var index = data.indexOf(item);
            return (
                <ControlText style={[{ width: windowWidth * 0.15 }, AppStyle.productNumber]} >
                    {data[index].COUNT || 0}</ControlText >
            )
        }
        return (
            <ControlText style={[{ width: windowWidth * 0.15 }, AppStyle.productNumber]} >0</ControlText >
        )
    }

    datHang = () => {
        try {
            console.log("onDatHang", "Press")
            let data = this.state.cart.data;
            let cart = this.state.cart;
            let dataInput = {};

            if (data && cart) {
                var date = new Date().getDate(); //Current Date
                var month = new Date().getMonth() + 1; //Current Month
                var year = new Date().getFullYear(); //Current Year
                dataInput.NGAY_TAO = `${date}/${month}/${year}`;
                dataInput.NGUOI_TAO_ID = 1;
                dataInput.TONG_TIEN = cart.TOTAL;
                let input = JSON.stringify(dataInput);
                axios({
                    method: 'POST',
                    url: `${this.state.config.apiUrl}ThemGioHang`,
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${this.state.token}`
                    },
                    data: input
                }).then((response) => {
                    this.setState({ gioHangId: response.data.Id });

                    let inputProduct = [];
                    for (let i = 0; i < data.length; i++) {
                        let p = {};
                        p.SAN_PHAM_ID = data[i].Id;
                        p.GIO_HANG_ID = response.data.Id;
                        p.SO_LUONG = data[i].COUNT;
                        p.GIA = data[i].DON_GIA;
                        inputProduct.push(p);
                    }

                    let jsProduct = JSON.stringify(inputProduct);

                    axios({
                        method: 'POST',
                        url: `${this.state.config.apiUrl}ThemCtGioHang`,
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${this.state.token}`
                        },
                        data: jsProduct
                    }).then((response) => {
                        if (response.data.Success) {
                            this.props.navigation.navigate("DsDonHang");
                        }
                    }).catch(function (error) {
                        console.log("!!!!!!!!!!!!!ERROR!!!!!!!!!!!\n")
                        console.log(error);
                    });
                }).catch(function (error) {
                    console.log("!!!!!!!!!!!!!ERROR!!!!!!!!!!!\n")
                    console.log(error);
                });

                // postApi(`${this.state.config.apiUrl}ThemGioHang`, input, header).then((response) => {
                //     this.setState({ gioHangId: response.Id });

                // }).catch(function (error) {
                //     console.log("onDatHang ERROR\n")

                // });


            }
        }
        catch (error) {
            console.log("onDatHang ERROR\n", JSON.stringify(error));
        }
    }
    viewCart = () => {
        var cart = this.state.cart;
        if (cart && cart.COUNT) {
            return (
                <View style={AppStyle.viewDelivery}>
                    <View style={{ width: "60%" }, AppStyle.viewButtonCart}>
                        <View style={{ width: 50, height: 50 }}>
                            <Image source={IMAGE.ICON_CARTDELIVERY}
                                style={{ width: 40, height: 40 }} resizeMode="contain"></Image>
                            <View style={{ position: "absolute", right: 0, top: 0, backgroundColor: "red", width: 20, height: 20, borderRadius: 15, alignItems: "center", justifyContent: "center" }}>
                                <ControlText style={{ fontSize: 12, color: "white" }}>{cart.COUNT}</ControlText>
                            </View>
                        </View>
                        <ControlText style={AppStyle.textViewButtonCart}>{cart.TOTAL} đ</ControlText>
                    </View>
                    <View style={{ width: windowWidth * 0.4 }, AppStyle.viewButtonDelivery}>
                        <TouchableOpacity style={[{ width: windowWidth * 0.3, height: windowHeight * 0.05 }, AppStyle.buttonDelivery]} onPress={() => {
                            this.datHang()
                        }}>
                            <ControlText style={AppStyle.textDelivery}>Đặt hàng</ControlText>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
        return (
            <View style={AppStyle.viewDelivery}>
                <View style={{ width: "60%" }, AppStyle.viewButtonCart}>
                    <View style={{ width: 50, height: 50 }}>
                        <Image source={IMAGE.ICON_CARTDELIVERY}
                            style={{ width: 40, height: 40 }} resizeMode="contain"></Image>
                        <View style={{ position: "absolute", right: 0, top: 0, backgroundColor: "red", width: 20, height: 20, borderRadius: 15, alignItems: "center", justifyContent: "center" }}>
                            <ControlText style={{ fontSize: 12, color: "white" }}>0</ControlText>
                        </View>
                    </View>
                    <ControlText style={AppStyle.textViewButtonCart}>0 đ</ControlText>
                </View>
                <View style={{ width: windowWidth * 0.4 }, AppStyle.viewButtonDelivery}>
                    <TouchableOpacity style={[{ width: windowWidth * 0.3, height: windowHeight * 0.05 }, AppStyle.buttonDelivery]} onPress={() => {
                        console.log("DAT HANG")
                        // this.datHang()
                    }}>
                        <ControlText style={AppStyle.textDelivery}>Đặt hàng</ControlText>
                    </TouchableOpacity>
                </View>
            </View>

        )
    }
}