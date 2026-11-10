
import { SerialPort } from 'serialport';

const port = new SerialPort({
    path: 'COM3',
    baudRate: 9600,
    dataBits: 8,
    stopBits: 1,
    parity: 'none',
    autoOpen: false,
});

port.open(error => {
    if (error) {
        console.error('ERROR AL ABRIR COM3:', error.message);
        return;
    }

    console.log('Bluetooth conectado. Enviando impresión...');

    const data = Buffer.concat([
        Buffer.from([0x1B, 0x40]), // Inicializar impresora
        Buffer.from([0x1B, 0x61, 0x01]), // Centrar
        Buffer.from('PRUEBA BLUETOOTH\n', 'ascii'),
        Buffer.from([0x1B, 0x61, 0x00]), // Alinear izquierda
        Buffer.from('JK-5801P\n', 'ascii'),
        Buffer.from('COM3 - 9600 BAUD\n', 'ascii'),
        Buffer.from('IMPRESION DIRECTA\n\n\n', 'ascii'),
        Buffer.from([0x1D, 0x56, 0x00]), // Corte (si es compatible)
    ]);

    port.write(data, error => {
        if (error) {
            console.error('ERROR AL ENVIAR:', error.message);
            port.close();
            return;
        }

        port.drain(error => {
            if (error) {
                console.error('ERROR AL COMPLETAR:', error.message);
            } else {
                console.log('DATOS ENVIADOS CORRECTAMENTE');
            }

            port.close();
        });
    });
});

port.on('error', error => {
    console.error('ERROR SERIAL:', error.message);
});
