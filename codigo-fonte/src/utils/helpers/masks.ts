// Aplica máscara de telefone: (00) 0 0000-0000 ou (00) 0000-0000
export const applyPhoneMask = (value: string): string => {
  const digits = value.replace(/\D/g, '');
  if (digits.length <= 10) {
    return digits.replace(/(\d{2})(\d{0,4})(\d{0,4})/, (_, ddd, p1, p2) => {
      let result = `(${ddd}`;
      if (p1) result += `) ${p1}`;
      if (p2) result += `-${p2}`;
      return result;
    });
  }
  return digits.replace(
    /(\d{2})(\d{1})(\d{0,4})(\d{0,4})/,
    (_, ddd, nine, p1, p2) => {
      let result = `(${ddd}) ${nine}`;
      if (p1) result += ` ${p1}`;
      if (p2) result += `-${p2}`;
      return result;
    }
  );
};

//Aplica máscara de CPF: 000.000.000-00
export const applyCPFMask = (value: string): string => {
  const digits = value.replace(/\D/g, '');
  return digits.replace(
    /(\d{3})(\d{0,3})(\d{0,3})(\d{0,2})/,
    (_, p1, p2, p3, p4) => {
      let result = p1;
      if (p2) result += `.${p2}`;
      if (p3) result += `.${p3}`;
      if (p4) result += `-${p4}`;
      return result;
    }
  );
};

// Aplica máscara de CNPJ: 00.000.000/0000-00
export const applyCNPJMask = (value: string): string => {
  const digits = value.replace(/\D/g, '');
  return digits.replace(
    /(\d{2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})/,
    (_, p1, p2, p3, p4, p5) => {
      let result = p1;
      if (p2) result += `.${p2}`;
      if (p3) result += `.${p3}`;
      if (p4) result += `/${p4}`;
      if (p5) result += `-${p5}`;
      return result;
    }
  );
};

// Aplica máscara de CEP: 00000-000
export const applyCEPMask = (value: string): string => {
  const digits = value.replace(/\D/g, '');
  return digits.replace(/(\d{5})(\d{0,3})/, (_, p1, p2) => {
    return p2 ? `${p1}-${p2}` : p1;
  });
};

// Remove todos os caracteres não numéricos
export const removeNonDigits = (value: string): string => {
  return value.replace(/\D/g, '');
};

// Aplica máscara de data: 00/00/0000
export const applyDateMask = (value: string): string => {
  const digits = value.replace(/\D/g, '');
  return digits.replace(/(\d{2})(\d{0,2})(\d{0,4})/, (_, p1, p2, p3) => {
    let result = p1;
    if (p2) result += `/${p2}`;
    if (p3) result += `/${p3}`;
    return result;
  });
};

// Aplica máscara de cartão de crédito: 0000 0000 0000 0000
export const applyCreditCardMask = (value: string): string => {
  const digits = value.replace(/\D/g, '');
  return digits.replace(
    /(\d{4})(\d{0,4})(\d{0,4})(\d{0,4})/,
    (_, p1, p2, p3, p4) => {
      let result = p1;
      if (p2) result += ` ${p2}`;
      if (p3) result += ` ${p3}`;
      if (p4) result += ` ${p4}`;
      return result;
    }
  );
};

// Aplica máscara de moeda BRL: R$ 0.000,00
export const applyCurrencyMask = (value: string): string => {
  let digits = value.replace(/\D/g, '');

  if (!digits) return 'R$ 0,00';

  const number = parseInt(digits) / 100;

  return number.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};
