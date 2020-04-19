import React, { Component } from "react";
import {
    View,
    SafeAreaView,
    Image,
    TouchableOpacity,
    ScrollView,
    FlatList,
    Dimensions,
    ActivityIndicator,
    Alert,
    Modal,
} from "react-native";
import { CustomHeader } from "../../index";

export default class DsDonHang extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            config: {},
            token: '',
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
                    title="Danh sách đơn hàng"
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
                        keyExtractor={(item, index) => "kDs" + index}
                    />
                </ScrollView>

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
                method: 'GET',
                url: `${this.state.config.apiUrl}LaySpGioHang?id=19`,
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
                console.log("loadData ERROR\n")
                console.log(error);
            });
        } catch (error) {
            Alert.alert("Load loadData loi:", JSON.stringify(error));
        }
    }
}