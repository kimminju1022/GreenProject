<?php

namespace Database\Factories;

use App\Models\Hotel;
use App\Models\HotelCategory;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\HotelInfo>
 */
class HotelInfoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $hotel = Hotel::select('hotel_id')->inRandomOrder()->first();
        $hotel_cat = HotelCategory::select('hc_id')->inRandomOrder()->first();

        return [
            'hotel_id' => $hotel->hotel_id,
            'hc_id' => $hotel_cat->hc_id,
        ];
    }
}
