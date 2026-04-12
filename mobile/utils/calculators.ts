/**
 * Vücut Kitle Endeksi (VKE / BMI) hesaplama
 */
export const calculateBMI = (weight: number, heightCm: number) => {
  const heightM = heightCm / 100;
  if (weight > 0 && heightM > 0) {
    const bmi = weight / (heightM * heightM);
    
    let status = "";
    let color = "";
    let description = "";

    if (bmi < 18.5) {
      status = "Zayıf";
      color = "#3b82f6";
      description = "Kilonuz boyunuza göre az. Dengeli beslenmeye odaklanmalısınız.";
    } else if (bmi < 24.9) {
      status = "Normal";
      color = "#22c55e";
      description = "Tebrikler! İdeal kilo aralığındasınız. Formunuzu koruyun.";
    } else if (bmi < 29.9) {
      status = "Fazla Kilolu";
      color = "#eab308";
      description = "İdeal kilonun biraz üzerindesiniz. Hareket miktarını artırın.";
    } else {
      status = "Obez";
      color = "#ef4444";
      description = "Kilonuz sağlığınızı tehdit edebilir. Bir uzmana danışmanızı öneririz.";
    }

    return {
      value: bmi.toFixed(1),
      status,
      color,
      description
    };
  }
  return null;
};
