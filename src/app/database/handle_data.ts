const api = 'http://localhost:3000/';

export async function HandleSignUp({ formData }: any) {
  try {
    const res = await fetch('/admin/api/sign_up', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData), // <-- body outside headers
    });

    const result = await res.json();

    if (!res.ok || !result.success) {
      return { success: false, message: result.message };
    }

    return result; // success
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function HandleLogIn({ formData }: any) {
  try {
    const res = await fetch('/admin/api/log_in', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData), // <-- body outside headers
    });

    const result = await res.json();

    if (!res.ok || !result.success) {
      return { success: false, message: result.message };
    }

    return result; // success
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function HandleAddDoctors({ formData }: any) {
  try {
    const res = await fetch('/admin/api/admin_doctors', {
      method: 'POST',
      body: formData, // <-- body outside headers
    });

    const result = await res.json();

    if (!res.ok || !result.success) {
      return { success: false, message: result.message };
    }

    return result; // success
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function HandleAddService({ formData }: any) {
  try {
    const res = await fetch('/admin/api/admin_services', {
      method: 'POST',
      body: formData, // <-- body outside headers
    });

    const result = await res.json();

    if (!res.ok || !result.success) {
      return { success: false, message: result.message };
    }

    return result; // success
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function GetDoctorsData() {
  try {
    const res = await fetch(`${api}/admin/api/get_doctors`, {
      method: 'GET',
    });

    const result = await res.json();

    if (!res.ok || !result.success) {
      return { success: false, message: result.message };
    }

    return result; // success
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function GetServiceData() {
  try {
    const res = await fetch(`${api}/admin/api/get_service`, {
      method: 'GET',
    });

    const result = await res.json();

    if (!res.ok || !result.success) {
      return { success: false, message: result.message };
    }

    return result; // success
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function DeleteDoctorData(el: any, type: string) {
  try {
    const res = await fetch(`${api}/admin/api/admin_delete_doctors`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ el, type }),
    });

    const result = await res.json();

    if (!res.ok || !result.success) {
      return { success: false, message: result.message };
    }

    return result; // success
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function AdminLogOut() {
  try {
    const res = await fetch(`${api}/admin/api/admin_log_out`, {
      method: 'POST',
    });

    const result = await res.json();

    if (!res.ok || !result.success) {
      return { success: false, message: result.message };
    }

    return result; // success
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function HandleBookForm({ bookForm }: any) {
  try {
    const res = await fetch('/admin/api/book_form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookForm), // <-- body outside headers
    });

    const result = await res.json();

    if (!res.ok || !result.success) {
      return { success: false, message: result.message };
    }

    return result; // success
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
