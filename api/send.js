import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { nombre, email, whatsapp, preferencia, mensaje } = req.body;

    const data = await resend.emails.send({
      from: 'Contacto Web <no-reply@tudominio.com>', // Cambiá por el dominio verificado en Resend
      to: 'tucorreo@ejemplo.com', // Tu correo de destino
      subject: `Nuevo mensaje de ${nombre}`,
      html: `
        <h2>Nuevo contacto desde la web</h2>
        <p><b>Nombre:</b> ${nombre}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>WhatsApp:</b> ${whatsapp}</p>
        <p><b>Preferencia:</b> ${preferencia}</p>
        <p><b>Mensaje:</b><br>${mensaje}</p>
      `,
    });

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Error al enviar correo:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}
