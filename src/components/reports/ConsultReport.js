import { useTranslation } from "react-i18next";
import moment from "moment/moment";
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    PDFViewer,
  } from "@react-pdf/renderer";
  
function ConsultReport(props) {
    const { selectedconsult } = props;
    const { t } = useTranslation();
    const specialistName = localStorage.getItem('specialistName');
    const specialistLastName = localStorage.getItem('specialistLastName');

    const styles = StyleSheet.create({
        page: {
        },
        title: {
            margin: 20,
            marginTop: 40,
            paddingBottom: 20
        },
        section: {
            margin: 10,
            padding: 10,
        },
        bottom: {
            margin: 20,
            marginTop: 40,
            paddingBottom: 40,
        },
        viewer: {
            width: "100%",
            height: window.innerHeight,
        },
    });

    return (
        <PDFViewer style={styles.viewer}>
            {/* Start of the document*/}
            <Document>
                {/*render a single page*/}
                <Page size="Letter" style={styles.page}>
                    <View style={styles.title}>
                        <Text>INFORME MÉDICO</Text>
                    </View>
                    <View style={styles.title}>
                        <Text>{selectedconsult.city}, {moment(Date.now()).format('DD-MM-YYYY')}</Text>
                    </View>
                    <View style={styles.section}>
                        <Text>Estimado Sr./Sra. {selectedconsult.user_name}</Text>
                    </View>
                    <View style={styles.section}>
                        <Text>El caso radicado por usted con las siguientes características:</Text>
                    </View>
                    <View style={styles.section}>
                        <Text>Tipo lesión: {selectedconsult.injury_type}</Text>
                        <Text>Forma: {selectedconsult.shape}</Text>
                        <Text>Nro lesiones: {selectedconsult.injuries_count}</Text>
                        <Text>Distribución: {selectedconsult.distribution}</Text>
                        <Text>Color: {selectedconsult.color}</Text>
                    </View>
                    <View style={styles.section}>
                        <Text>Presenta el siguiente diagnóstico:</Text>
                        <Text>{selectedconsult.diagnosis}</Text>
                    </View>
                    <View style={styles.bottom}>
                        <Text>Atentamente</Text>
                    </View>
                    <View style={styles.section}>
                        <Text>{specialistName} {specialistLastName}</Text>
                        <Text>Médico especialista</Text>
                    </View>
                </Page>
            </Document>
        </PDFViewer>
    );
}

export default ConsultReport;
