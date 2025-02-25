
// fn count_newlines(s: &str) -> usize {
//     s.as_bytes().iter().filter(|&&c| c == b'\n').count() + 1
// }

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn calc_text_rows(height: i32) -> String {
    let nr_of_lines = height / 24;
    let mut rows_text = String::new();
    for i in 1..(nr_of_lines + 1) {
        rows_text.push_str(&format!("{}\n", i));
    }
    return rows_text;
}

// #[tauri::command]
// fn calc_text_rows(text: &str) -> String {
//     let nr_of_lines = count_newlines(text);
//     let mut rows_text = String::new();
//     for i in 1..(nr_of_lines + 1) {
//         rows_text.push_str(&format!("{}\n", i));
//     }
//     return rows_text;
// }



#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet])
        .invoke_handler(tauri::generate_handler![calc_text_rows])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
