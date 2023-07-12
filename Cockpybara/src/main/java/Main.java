import com.opencsv.CSVReader;
import com.opencsv.CSVWriter;
import com.opencsv.exceptions.CsvValidationException;

import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;

public class Main {
    private static HashMap<String, ArrayList<String>> map = new HashMap<>();
    private static HashSet<String> units = new HashSet<>();
    private static HashSet<String> glass = new HashSet<>();

    public static void main(String[] args) throws CsvValidationException, IOException {
        String csvFile = "src\\main\\resources\\all_drinks.csv"; // 읽을 CSV 파일의 경로

        //csv파일 수정 - 비슷한 단위들 단일화
        try (CSVReader reader = new CSVReader(new FileReader(csvFile))) {
            String[] nextLine = reader.readNext();

            int rowNumber = 1; // 현재 행 번호 - 단위존재x 재료찾는 코드에 사용
            while ((nextLine = reader.readNext()) != null) {
                glass.add(nextLine[7]);
                for (int i = 9; i <= 23; i++) {
                    String ingredient = nextLine[i];
                    if (ingredient == null || ingredient.trim().isEmpty()) {
                        continue;
                    }

                    String measure = nextLine[i + 16];
                    if (measure.equals("\n") || measure.trim().isEmpty()) {
                        printMissingIngredient(ingredient, rowNumber); // 단위가 존재하지 않는 재료 출력
                        //재료가 있는데 단위가 비어있는경우 -> fill로 채우기
                        measure = "fill";
                    }

                    measure = normalizeUnit(measure); // 단위 통일화(밑에 함수와 주석참고)

                    ArrayList<String> list = map.getOrDefault(ingredient, new ArrayList<>());
                    if (!list.contains(measure)) {
                        units.add(measure);
                        list.add(measure);
                    }
                    map.put(ingredient, list);
                }
                rowNumber++;
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        // 칵테일 CSV 파일에서 재료와 단위를 정제하여 새로운 CSV 파일 생성
        String outputCsvFile = "src/main/resources/all_ingredients.csv"; // 저장할 CSV 파일의 경로

        try (CSVWriter writer = new CSVWriter(new FileWriter(outputCsvFile))) {
            // 헤더 라인 작성
            String[] header = {"Ingredient", "Unit"};
            writer.writeNext(header);

            // 데이터 작성
            for (HashMap.Entry<String, ArrayList<String>> entry : map.entrySet()) {
                String ingredient = entry.getKey();
                ArrayList<String> units = entry.getValue();

                for (String unit : units) {
                    String[] data = {ingredient, unit};
                    writer.writeNext(data);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        String outCsvFile = "src/main/resources/ingredients_list.csv"; // 저장할 CSV 파일의 경로
        try (CSVWriter writer2 = new CSVWriter(new FileWriter(outCsvFile))) {
            // 헤더 라인 작성
            String[] header = {"Ingredient", "Unit1","Unit2","Unit3","Unit4","Unit5","Unit6","Unit7","Unit8","Unit9","Unit10","Unit11" };
            writer2.writeNext(header);

            // 데이터 작성
            for (HashMap.Entry<String, ArrayList<String>> entry : map.entrySet()) {
                String ingredient = entry.getKey();
                ArrayList<String> units = entry.getValue();

                // ingredient와 units를 하나의 배열로 합치기
                String[] data = new String[12]; // 최대 11개의 단위까지 처리 가능
                data[0] = ingredient;
                int i;
                for (i = 0; i < units.size(); i++) {
                    data[i + 1] = units.get(i);
                }
                writer2.writeNext(data);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        // 정제된 재료와 단위 출력
        System.out.println("Unit List:");
        for (String unit : units) {
            System.out.println(unit);
        }
        System.out.println("Total Units: " + units.size());

        // 원본 칵테일 레시피 CSV 파일의 단위 통일화하여 새로운 CSV 파일 생성
        String originalCsvFile = "src\\main\\resources\\all_drinks.csv"; // 원본 칵테일 레시피 CSV 파일의 경로
        String refinedCsvFile = "src\\main\\resources\\refined_drinks.csv"; // 정제된 칵테일 레시피 CSV 파일의 경로

       // refineCocktailCsv(originalCsvFile, refinedCsvFile);  //원본 엑셀파일 단위 정제
    }
    private static void printMissingIngredient(String ingredient, int rowNumber) {
        System.out.println("Missing Ingredient: " + ingredient + ", Row: " + rowNumber);
    }

    private static String normalizeUnit(String measure) {
        measure = measure.toLowerCase().trim();

        if (measure.contains("oz") || measure.contains("jigger") || measure.contains("shot")||measure.contains("cl") ||measure.contains("cL")) {
            return "oz";
        }
        else if (measure.contains("ml") || measure.contains("dl") || measure.contains("pint")) {
            return "ml";
        }
        else if (measure.contains("tblsp")) {
            return "tblsp";
        }
        else if (measure.contains("tsp") || measure.contains("spoon")) {
            return "tsp";
        }
        else if (measure.contains("cup")) {
            return "cup";
        }
        else if (measure.contains("slice") || measure.contains("wedge")) {
            return "slice";
        }
        else if (measure.contains("scoop")) {
            return "scoop";
        }
        else if (measure.contains("inch")) {
            return "inch";
        }
        else if (measure.contains("glass")) {
            return "glass";
        }
        else if (measure.contains("bottle")) {
            return "bottle";
        }
        else if (measure.contains("gr")) {
            return "gr";
        }
        else if (measure.contains("lb")) {
            return "lb";
        }
        else if (measure.contains("gal")) {
            return "gal";
        }
        else if (measure.contains("part")) {
            return "part";
        }
        else if (measure.contains("can")) {
            return "can";
        }
        else if (measure.contains("liter") ||measure.contains("quart") || measure.contains("qt")) {
            return "liter";
        }
        else if (measure.contains("dash") || measure.contains("splash")) {
            return "dash";
        }
        else if (measure.contains("count") || measure.contains("cube") || measure.contains("fifth")) {
            return "count";
        }
        else if (measure.contains("chunk") || measure.contains("piece") || measure.contains("whole")) {
            return "piece";
        }
        else if (measure.contains("stick")) {
            return "stick";
        }
        else if (measure.contains("fill") || measure.contains("with") || measure.contains("taste")
                || measure.contains("top") || measure.contains("up") || measure.contains("of")
                || measure.contains("garnish")|| measure.contains("full") || measure.contains("chilled")) {
            return "fill";
        }
        else if (measure.contains("drop")) {
            return "drop";
        }
        else if (measure.matches("\\d+(\\.\\d+)?")) {
            return "count";
        }

        return measure;
    }

    //데이터 정제된 새로운 엑셀 파일만들기
    private static void refineCocktailCsv(String originalCsvFile, String refinedCsvFile) {
        try (CSVReader reader = new CSVReader(new FileReader(originalCsvFile));
             CSVWriter writer = new CSVWriter(new FileWriter(refinedCsvFile))) {

            String[] nextLine;

            int rowNumber = 1; // 현재 행 번호 - 단위존재x 재료찾는 코드에 사용
            while ((nextLine = reader.readNext()) != null) {
                for (int i = 9; i <= 23; i++) {
                    String ingredient = nextLine[i];
                    if (ingredient == null || ingredient.trim().isEmpty()) {
                        continue;
                    }

                    String measure = nextLine[i + 16];
                    if (measure.equals("\n") || measure.trim().isEmpty()) {
                        printMissingIngredient(ingredient, rowNumber); // 단위가 존재하지 않는 재료 출력
                        //재료가 있는데 단위가 비어있는경우 -> fill로 채우기
                        measure = "fill";
                    }

                    measure = normalizeUnit(measure); // 단위 통일화(밑에 함수와 주석참고)

                    ArrayList<String> list = map.getOrDefault(ingredient, new ArrayList<>());
                    if (!list.contains(measure)) {
                        units.add(measure);
                        list.add(measure);
                    }
                    map.put(ingredient, list);
                }
                rowNumber++;
            }
            //이 아래 코드랑 위에 코드랑 합쳐야함...
            writer.writeNext(reader.readNext()); // Write the header line

            while ((nextLine = reader.readNext()) != null) {
                String[] refinedLine = new String[nextLine.length];

                for (int i = 0; i < nextLine.length; i++) {
                    refinedLine[i] = normalizeIngredientUnit(nextLine[i]); //데이터 단위 정제
                }

                writer.writeNext(refinedLine);
            }

        } catch (IOException | CsvValidationException e) {
            e.printStackTrace();
        }


    }

    private static String normalizeIngredientUnit(String ingredient) {
        if (ingredient.isEmpty()) {
            return "fill"; // Return "fill" for unit-only ingredient
        }
        String[] parts = ingredient.trim().split("\\s+", 2); // Split into quantity and unit

        if (parts.length == 2) {
            String quantity = parts[0].trim();
            String unit = parts[1].trim();

            // Handle unit-only case

           /*
            //양은 소수 둘째자리까지만
            double quantityValue = Double.parseDouble(quantity);

            try {
                quantityValue = Double.parseDouble(quantity);
                quantity = String.format("%.2f", quantityValue);
            } catch (NumberFormatException e) {
                // Handle non-numeric quantity, e.g. "fill"
                quantity = "0";
                unit = normalizeUnit(unit);
                return quantity + " " + unit;
            }
            */
            // Normalize unit
            unit = normalizeUnit(unit);

            return quantity + " " + unit;
        }

        return ingredient;
    }



}

/*
  단위 설명관련(총 22가지)
  단위 변경 코드 추가, 알아둬야할것: 복수형 구분안하고 그냥 다 단수형으로 함(2 counts -> 2 count)
  - drop 방울
  - glass 잔(ex. 0.5glass면 잔의 반)
  - scoop
  - part 배(2part면 다른 액체보다 2배의 양)
  - liter 리터(1liter = 1quart = 1qt)
  - count 개수(count = cube = fifth)
  - oz 양주세는단위(1oz = 1jigger = 1shot = 3cl = 30ml)
  - bottle
  - lb 파운드(1lb = 0.45kg)
  - gr 그램
  - tblsp 큰숟가락
  - fill 나머지, 꾸미기, 장식 (fill, with, taste, top, up, of, garnish, full, chilled 같이묶음)
  - tsp 작은숟가락
  - can
  - gal 3.78리터
  - slice 비스듬한조각 ex.과일 (slice, wedge 묶음)
  - piece 조각(piece, chunk, whole 묶음)
  - stick 가지
  - inch 길이
  - dash 소량의 액체(3dash = 1splash)
  - cup
  - 500ml = 5dl = 1pint
 */