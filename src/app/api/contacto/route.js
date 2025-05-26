import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/mailer';

export async function POST(request) {
  try {
    const { nombre, email, asunto, mensaje } = await request.json();

    // Validación básica
    if (!nombre || !email || !asunto || !mensaje) {
      return NextResponse.json(
        { success: false, error: 'Todos los campos son obligatorios' },
        { status: 400 }
      );
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'El formato del correo electrónico no es válido' },
        { status: 400 }
      );
    }

    // Enviar correo al administrador
    const adminEmailResult = await sendEmail({
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: `Nuevo mensaje de contacto: ${asunto}`,
      text: `
        Has recibido un nuevo mensaje a través del formulario de contacto:
        
        Nombre: ${nombre}
        Email: ${email}
        Asunto: ${asunto}
        Mensaje: ${mensaje}
      `,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Asunto:</strong> ${asunto}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${mensaje.replace(/\n/g, '<br>')}</p>
      `,
    });

    if (!adminEmailResult.success) {
      throw new Error('Error al enviar el correo al administrador');
    }

    // Enviar correo de confirmación al usuario
    const userEmailResult = await sendEmail({
      to: email,
      subject: 'Confirmación de recepción de tu mensaje',
      text: `
        Hola ${nombre},
        
        Hemos recibido tu mensaje a través de nuestro formulario de contacto. 
        Nos pondremos en contacto contigo lo antes posible.
        
        Este es un mensaje automático, por favor no respondas a este correo.
        
        Atentamente,
        El equipo de Portal Departamental
      `,
      html: `
        <h2>¡Hola ${nombre}!</h2>
        <p>Hemos recibido tu mensaje a través de nuestro formulario de contacto. 
        Nos pondremos en contacto contigo lo antes posible.</p>
        <p>Este es un mensaje automático, por favor no respondas a este correo.</p>
        <p>Atentamente,<br>El equipo de Portal Departamental</p>
      `,
    });

    if (!userEmailResult.success) {
      console.warn('No se pudo enviar el correo de confirmación al usuario');
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Mensaje enviado correctamente' 
    });

  } catch (error) {
    console.error('Error en el endpoint de contacto:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Error al procesar la solicitud',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}
