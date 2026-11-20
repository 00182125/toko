import type { Reply } from '@/types/chat'

// Contacto de la central telefónica de la UCA.
export function supportReply(): Reply {
  return {
    text: 'Claro, esta es la central de la UCA:',
    card: {
      kind: 'info',
      data: {
        title: 'Central telefónica UCA',
        description: 'Llama y pide que te comuniquen con el área que necesitas.',
        rows: [
          { icon: 'b4d5a.svg', text: '2210-6600' },
          { icon: 'af182.svg', text: 'atencion.cliente@uca.edu.sv', trailingIcon: 'c3cba.svg' },
          { icon: '0da32.svg', text: 'Bulevar Los Próceres, San Salvador' },
        ],
        action: 'Llamar',
        actionIcon: '58e0a.svg',
        href: 'tel:+50322106600',
        tone: 'support',
      },
    },
  }
}
